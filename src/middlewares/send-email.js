import nodeMailer from 'nodemailer'
import '../common/env.js'

const transporter = nodeMailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendMail = async (credentials) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: credentials.to,
      subject: credentials.intent,
      html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
              <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
                <div style="text-align: center;">
                  <h1 style="color: #333;">Thank You for Your Donation!</h1>
                </div>
                <div style="margin-top: 40px;">
                  <p style="font-size: 16px;">Dear ${credentials.to},</p>
                  <p style="font-size: 16px; margin-top:20px ;padding-left: 15%">Thank you for your generous donation of ${credentials.amount}.</p>
                  <p style="font-size: 16px;padding-left: 15%">We greatly appreciate your support and contribution.</p>
                </div>
                <div style="text-align: center; margin-top: 100px; padding-left:50%">
                  <p style="font-size: 16px;">Best regards,</p>
                  <p style="font-size: 16px;">Your Organization</p>
                </div>
              </div>
            </div>`
    })
    return info
  } catch (error) {
    console.error({ issue: 'email service down', error })
  }
}

export default sendMail;