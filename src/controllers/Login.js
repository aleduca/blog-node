const { validationResult } = require('express-validator');
const { findBy } = require('../database/repository/user');
const { MASTER_DIR } = require('../helpers/constants');
const { flash } = require('../helpers/flash');
const bcrypt = require('bcrypt');

exports.index = function (request, response) {
  flash(request, response);
  response.render('login', {
    layout: MASTER_DIR,
    title: 'Login',
  });
};

exports.store = async function (request, response) {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      request.session.messages = errors;
      return response.redirect('/login');
    }

    const userFind = await findBy('email', request.body['email']);

    if (!userFind) {
      request.session.messages = { loginMessage: 'Usuário ou senha inválidos' };
      return response.redirect('/login');
    }

    const passwordVerified = bcrypt.compareSync(
      request.body['password'],
      userFind.password
    );

    if (!passwordVerified) {
      request.session.messages = { loginMessage: 'Usuário ou senha inválidos' };
      return response.redirect('/login');
    }

    request.session.user = userFind;
    return response.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.destroy = function (request, response) {
  request.session.destroy((error) => {
    if (error) console.log(error);
    delete request.session?.user;
    response.redirect('/');
  });
};
