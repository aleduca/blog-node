const { paginate } = require('./paginate');

const {
  post,
  category: categoryModel,
  cover,
  comment,
  Sequelize,
} = require('../models');

exports.categoryWithPosts = async function (request, slug) {
  try {
    const category = await categoryModel.findOne({
      where: {
        slug,
      },
    });

    paginate.setRequest(request).setOptions({
      attributes: [
        'title',
        'slug',
        'content',
        [
          Sequelize.fn('count', Sequelize.col('comments.postId')),
          'commentsCount',
        ],
      ],
      replacements: [category.id],
      where: Sequelize.literal('`categories->categoryPosts`.`categoryId` = ? '),
      subQuery: false,
      include: [
        {
          attributes: [],
          through: {
            attributes: {
              include: [],
              exclude: ['createdAt', 'updatedAt', 'postId', 'categoryid'],
            },
          },
          model: categoryModel,
          as: 'categories',
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

    const data = await paginate.paginate(post);
    const links = paginate.render(data['count']);

    const { name, slug: slugcategory } = category;

    return {
      posts: data['rows'],
      links,
      category: { name, slug: slugcategory },
      count: data['count'],
    };
  } catch (error) {
    console.log(error);
  }
};
