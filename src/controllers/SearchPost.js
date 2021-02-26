const { MASTER_DIR } = require('../helpers/constants');
const { post } = require('../database/repository/search');

exports.index = async function (request, response) {
  try {
    const searched = request.query['s'];

    if (!searched) {
      return response.redirect('/');
    }

    const posts = await post(request, searched);

    // return response.json(posts);

    return response.render('search', {
      layout: MASTER_DIR,
      title: 'Search',
      ...posts,
    });
  } catch (error) {
    console.log(error);
  }
};
