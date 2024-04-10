const TelegramBot = require('node-telegram-bot-api');

// Telegram Bot Token (replace with your token)
const token = '6851281380:AAEQc2bfzqH87nagYLDN22eDN7U-tKZqXD8';

// Endpoint from which to fetch categories
const categoriesEndpoint = 'https://sheets-movie-database.onrender.com/movies';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

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
  console.log(categories);
  if (categories.length > 0) {
      const keyboard = {
          inline_keyboard: categories.map(cat => ([
            {
              text: cat,
              callback_data: cat 
          }
          ]))
      };
      bot.sendMessage(chatId, 'Choose a category:', { reply_markup: JSON.stringify(keyboard) });
  } else {
      bot.sendMessage(chatId, 'No categories available.');
  }
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  sendCategories(chatId)
});

module.exports = {
  bot,
  sendCategories
};