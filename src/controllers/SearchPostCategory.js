const { postsCategory } = require('../database/repository/search');
const { MASTER_DIR } = require('../helpers/constants');

exports.index = async function (request, response) {
  try {
    const searched = request.query['s'];
    const slug = request.params['slug'];

    if (!searched || !slug) {
      return response.redirect('/');
    }

    const posts = await postsCategory(request, slug, searched);

    // return response.json(posts);

    return response.render('category', {
      layout: MASTER_DIR,
      title: 'Category',
      ...posts,
    });

    return response.json('searched');
  } catch (error) {
    console.log(error);
  }
};
