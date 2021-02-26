const express = require('express');
const Category = require('../controllers/Category');

const router = express.Router();

router.get('/', Category.index);

module.exports = router;
