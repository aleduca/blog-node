const { create } = require('../database/repository/comment');

exports.store = async function (request, response) {
  try {
    const data = request.body;

    // Object.assign(data, { userId: request.session.user['id'] });

    const commentText = data['comment'].replace(/(<([^>]+)>)/gi, '');

    const comment = {
      postId: data['postId'],
      userId: request.session.user['id'],
      comment: commentText,
    };

    const created = await create(comment);

    if (created) {
      return response.json('created').status(200);
    }

    response.json('not_created').status(404);
  } catch (error) {
    console.log(error);
  }
};
