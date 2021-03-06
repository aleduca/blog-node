const { categoryWithPosts } = require('../database/repository/category');
const { MASTER_DIR } = require('../helpers/constants');

exports.index = async function (request, response) {
  try {
    const slug = request.params['slug'];

    // return response.json(slug);
    if (!slug) {
      return response.redirect('/');
    }

    const posts = await categoryWithPosts(request, slug);

    // return response.json(posts);

    return response.render('category', {
      layout: MASTER_DIR,
      title: 'Category',
      ...posts,
    });
  } catch (error) {
    console.log(error);
  }
};
