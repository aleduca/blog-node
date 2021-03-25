const { categories } = require('../database/repository/categories');
const { MASTER_DIR } = require('../helpers/constants');

exports.index = async function (request, response) {
  try {
    const data = await categories(request);

    // return response.json(data);

    return response.render('categories', {
      layout: MASTER_DIR,
      title: 'Categories',
      categories: data,
    });
  } catch (error) {
    console.log(error);
  }
};
