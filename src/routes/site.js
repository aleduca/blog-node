const express = require('express');
const Home = require('../controllers/Home');
const User = require('../controllers/User');
const { editUser } = require('../middlewares/middlewares');

const router = express.Router();

router.get('/', Home.index);
router.get('/user/edit', editUser, User.edit);

module.exports = router;
