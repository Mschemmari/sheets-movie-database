const {google} = require('googleapis');
const serviceAccountKeyFile = "./sexflix-418413-c92bfa5fcf48.json";


const sheetUtils = {
  sheetId : '1A3e5lmi7bWx0UMIs3VrIUoOV7sPBOH5OS28ZfPXcF-Y',
  tabName : '',
  range : 'B:B'
}

const token = '6851281380:AAEQc2bfzqH87nagYLDN22eDN7U-tKZqXD8';
const categoriesEndpoint = 'https://sheets-movie-database.onrender.com/movies';
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

const _readGoogleSheet = async (googleSheetClient, range)=> {
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetUtils.sheetId,
    range: `${sheetUtils.tabName}!${range}`,
  });

  return res.data.values;
}

// Function to fetch categories from the endpoint using fetch
async function fetchCategories() {
  try {
      const response = await fetch(categoriesEndpoint);
      const data = await response.json()
      return data;
  } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
  }
}

// Function to send categories to the user
async function sendCategories(chatId) {
const categories = await fetchCategories();
if (categories.length > 0) {
    const keyboard = {
        inline_keyboard: categories.map(category => ([
          {
            text: category.join().toString(),
            callback_data: category.join().toString(), 
        }
        ]))
    };
    console.log(JSON.stringify(keyboard));
    bot.sendMessage(chatId, 'Choose a category:', { reply_markup: JSON.stringify(keyboard) });
} else {
    bot.sendMessage(chatId, 'No categories available.');
}
}

module.exports = {
  _readGoogleSheet,
  _getGoogleSheetClient,
  sendCategories,
  token,
  sheetUtils
};