const { inPost } = require('../database/repository/post');
const { MASTER_DIR } = require('../helpers/constants');

exports.show = async function (request, response) {
  try {
    const slug = request.params['slug'];

    const post = await inPost(slug);

    if (!post) {
      return response.redirect('/');
    }

    // response.json(post);

    return response.render('post', {
      layout: MASTER_DIR,
      title: 'post',
      post,
    });
  } catch (error) {
    console.log(error);
  }
};
