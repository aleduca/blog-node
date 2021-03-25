const { paginate } = require('./paginate');
const {
  post,
  user,
  cover,
  comment,
  Sequelize,
  category: categoryModel,
} = require('../models');

exports.post = async function (request, searched) {
  try {
    paginate.setRequest(request);
    paginate.setOptions({
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
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${searched}%` } },
          { content: { [Sequelize.Op.like]: `%${searched}%` } },
        ],
      },
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
    const data = await paginate.paginate(post);
    const links = paginate.render(data['count']);
    return {
      posts: data['rows'],
      links,
      count: data['count'],
    };
  } catch (error) {
    console.log(error);
  }
};

exports.postsCategory = async function (request, slug, searched) {
  const category = await categoryModel.findOne({
    where: {
      slug,
    },
  });

  paginate
    .setLimit(1)
    .setRequest(request)
    .setOptions({
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
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${searched}%` } },
          { content: { [Sequelize.Op.like]: `%${searched}%` } },
        ],
        [Sequelize.Op.and]: [
          Sequelize.literal('`categories->categoryPosts`.`categoryId` = ? '),
        ],
      },
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
};
