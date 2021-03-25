const { MASTER_DIR } = require('../helpers/constants');

exports.edit = function (request, response) {
  console.log(request.session.user);
  return response.render('user_edit', {
    layout: MASTER_DIR,
    title: 'Edit',
  });
};
