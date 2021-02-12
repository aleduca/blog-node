const { paginate } = require('./paginate');
const { post, user, cover, comment, Sequelize } = require('../models');

exports.inHome = function (request) {
  const posts = post.findAll({
    limit: 12,
    order: [['id', 'desc']],
    subQuery: false,
    attributes: [
      'title',
      'slug',
      'content',
      [
        Sequelize.fn('count', Sequelize.col('comments.postId')),
        'commentsCount',
      ],
    ],
    include: [
      {
        attributes: ['firstName', 'lastName'],
        model: user,
        as: 'user',
      },
      {
        attributes: ['path'],
        model: cover,
        as: 'cover',
      },
      {
        attributes: [],
        model: comment,
        as: 'comments',
      },
    ],
    group: ['post.id'],
  });

  return posts;
};
