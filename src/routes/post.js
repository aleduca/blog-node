const express = require('express');
const Post = require('../controllers/Post');

const router = express.Router();

router.get('/:slug', Post.show);

module.exports = router;
