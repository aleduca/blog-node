const express = require('express');
const Category = require('../controllers/Category');

const router = express.Router();

router.get('/', Category.index);
router.get('/:slug', Category.index);

module.exports = router;
