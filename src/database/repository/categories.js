const { category, Sequelize, post } = require('../models');

exports.categories = function () {
  return category.findAll({
    attributes: {
      include: [
        [Sequelize.fn('count', Sequelize.col('posts.id')), 'postsCount'],
      ],
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      attributes: [],
      through: {
        attributes: {
          include: [],
          exclude: ['createdAt', 'updatedAt', 'postId', 'categoryId'],
        },
      },
      model: post,
      as: 'posts',
    },
    group: ['category.id'],
  });
};
