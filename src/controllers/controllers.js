import sendMail from "../middlewares/send-email.js";
import saveToSheet from "../middlewares/save-to-sheet.js";
import logger from "../common/logger.js";
import Stripe from 'stripe'
import '../common/env.js'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY)


const create = async (req, res) => {
    const { donorName, donorEmail, amount } = req.body;

    const SUCCESS_URL = process.env.SUCCESS_URL
    const CANCEL_URL = process.env.CANCEL_URL
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation',
                    },
                    unit_amount: amount * 100, // Stripe expects amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: SUCCESS_URL,
            cancel_url: CANCEL_URL, 
            customer_email: donorEmail,
            client_reference_id: donorName,
            metadata: {
                donorName: donorName,
                donorEmail: donorEmail
            },
        });
        
        const checkoutSessionId = session.id;
        const checkoutSessionUrl = session.url;

        logger.info(`Successfully create stripe payment intent for ${donorEmail}`)
        res.status(200).json({"checkoutSessionId": checkoutSessionId,"checkoutUrl": checkoutSessionUrl });
    } catch (err) {
        logger.error('Error creating payment intent:', err);
        res.status(500).json({ message: 'Error creating payment intent' });
    }
};


const handle_Webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const WEBHOOK_SECRET_KEY = process.env.WEBHOOK_SECRET_KEY

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET_KEY);
    } catch (err) {
        console.error('Webhook error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const { amount, receipt_email } = paymentIntent;
            const metadata = paymentIntent.metadata;
            const { donorName, donorEmail } = metadata;

            // Save donor information to Google Sheets
            const newRowData = [new Date().toString(), donorName, donorEmail, amount];
            const sheetName = 'info';
            try {
                const sheetResponse = await saveToSheet(sheetName, newRowData);
            } catch (error) {
                logger.error('Error saving to Google Sheets:', error);
            }

            try {
                const credentials = {
                    to: donorEmail,
                    intent: 'Confirmation of Donation',
                    amount: amount
                }
                
                const sendResponse = await sendMail(credentials);
                if (!sendResponse){
                    logger.error('could not send email, try later');
                }
            }
            catch(err){
                logger.error(err.message);
            }
            break;

        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object;
            logger.error('Payment Failed', failedPaymentIntent)
            break;
        
        default:
            logger.error(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};


export default {
    create,
    handle_Webhook
}