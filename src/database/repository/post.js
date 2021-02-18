const { post, user, comment, avatar } = require('../models');

exports.inPost = function (slug) {
  return post.findOne({
    attributes: ['id', 'title', 'content'],
    where: {
      slug,
    },
    include: [
      {
        attributes: ['firstName', 'lastName'],
        model: user,
        as: 'user',
        include: {
          attributes: ['path'],
          model: avatar,
          as: 'avatar',
        },
      },
      {
        attributes: ['id', 'comment'],
        model: comment,
        as: 'comments',
        include: {
          attributes: ['firstName', 'lastName', 'isAdmin'],
          model: user,
          as: 'user',
          include: {
            attributes: ['path'],
            model: avatar,
            as: 'avatar',
          },
        },
      },
    ],
  });
};
