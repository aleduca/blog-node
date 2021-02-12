const express = require('express');
const Home = require('../controllers/Home');

const router = express.Router();

router.get('/', Home.index);

module.exports = router;
