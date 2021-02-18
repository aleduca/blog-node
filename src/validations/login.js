const { body } = require('express-validator');

exports.login = [
  body('email')
    .escape()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Email inválido'),
  body('password')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password é obrigatório'),
];
