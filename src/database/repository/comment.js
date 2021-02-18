const { comment } = require('../models');
exports.create = function (data) {
  return comment.create(data);
};
