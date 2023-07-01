import sendMail from "../middlewares/send-email.js";
import saveToSheet from "../middlewares/save-to-sheet.js";
import logger from "../common/logger.js";

const create = async (req, res) => {
    const {donorName, donorEmail, amount } = req.body;
    if (!donorEmail || !donorName || !amount ){
        return res.status(401).json({message: "enter all the feilds"})
    }

    const timeStamp = new Date().toString();

    const newRowData = [timeStamp, donorName, donorEmail, amount];
    const sheetName = 'info';

    try {
        const sheetResponse = await saveToSheet(sheetName, newRowData);
        
        const credentials = {
            to: donorEmail,
            intent: 'Conformation of Delivery',
            amount: amount
        }
        
        const sendResponse = await sendMail(credentials);
        if (!sendResponse){
            return res.status(500).json({ message: 'could not send email, try later' });
        }
        return res.status(200).json({ message: 'success' });
    }
    catch(err){
        logger.error(err.message);
        return res.status(500).json({message: err.message});
    }

}



export default {
    create
}