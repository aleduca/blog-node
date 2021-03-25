const { user, avatar } = require('../models');
exports.findWithAvatar = function (type, value) {
  return user.findOne({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    where: {
      [type]: value,
    },
    include: {
      attributes: ['path'],
      model: avatar,
      as: 'avatar',
    },
  });
};
