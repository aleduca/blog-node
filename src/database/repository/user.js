const { user } = require('../models');
exports.findBy = function (type, value) {
  return user.findOne({
    where: {
      [type]: value,
    },
  });
};
