const express = require('express');
const Login = require('../controllers/Login');

const { login: loginValidation } = require('../validations/login');

const router = express.Router();

router.get('/', Login.index);
router.post('/', loginValidation, Login.store);
router.get('/logout', Login.destroy);

module.exports = router;
