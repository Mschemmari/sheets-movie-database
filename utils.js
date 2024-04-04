const {google} = require('googleapis');
const serviceAccountKeyFile = "./sexflix-418413-c92bfa5fcf48.json";

const _getGoogleSheetClient = async ()=>{
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
}

const _readGoogleSheet = async (googleSheetClient, sheetId, tabName, range)=> {
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return res.data.values;
}

const sheetUtils = {
  sheetId : '1A3e5lmi7bWx0UMIs3VrIUoOV7sPBOH5OS28ZfPXcF-Y',
  tabName : '',
  range : 'B:B'
}

module.exports = {
  _readGoogleSheet,
  _getGoogleSheetClient,
  sheetUtils
};