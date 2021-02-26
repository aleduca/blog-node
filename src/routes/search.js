const express = require('express');
const SearchPost = require('../controllers/SearchPost');

const router = express.Router();

router.get('/post', SearchPost.index);

module.exports = router;
