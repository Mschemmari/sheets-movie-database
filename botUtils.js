const categoriesEndpoint = 'https://sheets-movie-database.onrender.com/movies';

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



module.exports = {
  fetchCategories,
  sendCategories
};