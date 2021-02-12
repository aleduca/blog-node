const { body } = require("express-validator");

exports.login = [
  body("email").isEmail().withMessage("Esse campo tem que ter um email válido"),
  body("email").not().isEmpty().withMessage("Email é obrigatório"),
  body("password").not().isEmpty().withMessage("Password é obrigatório"),
  body("email").custom((value, { request }) => {
    if (value !== "xandecar@hotmail.com") {
      throw new Error("Esse email já está cadastrado no banco dados");
    }

    return true;
  }),
];
