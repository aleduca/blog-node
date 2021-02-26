const { paginate } = require('./paginate');
const { post, user, cover, comment, Sequelize } = require('../models');

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
