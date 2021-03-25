const express = require('express');
const Categories = require('../controllers/Categories');

const router = express.Router();

router.get('/', Categories.index);

module.exports = router;
