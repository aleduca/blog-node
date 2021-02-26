const { category, Sequelize, post } = require('../models');

exports.categories = function () {
  return category.findAll({
    attributes: [
      'name',
      'slug',
      [Sequelize.fn('count', Sequelize.col('posts.categoryId')), 'postsCount'],
    ],
    include: {
      attributes: [],
      model: post,
      as: 'posts',
    },
    group: ['category.id'],
  });
};
