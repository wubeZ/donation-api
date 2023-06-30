import {google} from 'googleapis';
import '../common/env.js'

// return a promise to handle save to sheet
const saveToSheet = (sheetName, newRowData) => {
    return new Promise((resolve, reject) => {
      const client = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']
      );
  
      client.authorize(function(err, tokens) {
        if (err) {
          console.error('Error authenticating:', err);
          reject(err);
          return;
        }
  
        // Once authorized, you can use the client for API requests
        const sheets = google.sheets({ version: 'v4', auth: client });
  
        // Example usage: Insert a row of data
        const spreadsheetId = process.env.SPREADSHEET_ID;
  
        sheets.spreadsheets.values.append(
          {
            spreadsheetId,
            range: `${sheetName}!A:D`,
            valueInputOption: 'USER_ENTERED',
            resource: {
              values: [newRowData],
            },
          },
          (err, response) => {
            if (err) {
              console.error('Error inserting row:', err);
              reject(err);
              return;
            }
            console.log('Row inserted successfully.');
            resolve(response);
          }
        );
      });
    });
  };
  
  export default saveToSheet;
  

