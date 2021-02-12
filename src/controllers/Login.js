const { validationResult } = require('express-validator');
const { MASTER_DIR } = require('../helpers/constants');
const { flash } = require('../helpers/flash');

const index = function (request, response) {
  flash(request, response);
  return response.render('login', {
    layout: MASTER_DIR,
    title: 'Login',
  });
};

const store = function (request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    request.session.messages = errors;
    return response.redirect('/login');
  }
  request.session.messages = {
    errorLogged: 'Usuário ou senha inválidos',
  };

  return response.redirect('/login');
};

module.exports = { index, store };
