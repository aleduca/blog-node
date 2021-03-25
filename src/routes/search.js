const express = require('express');
const SearchPost = require('../controllers/SearchPost');
const SearchPostCategory = require('../controllers/SearchPostCategory');

const router = express.Router();

router.get('/post', SearchPost.index);
router.get('/post/category', SearchPostCategory.index);
router.get('/post/category/:slug', SearchPostCategory.index);

module.exports = router;
