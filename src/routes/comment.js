const express = require('express');
const Comment = require('../controllers/Comment');

const router = express.Router();

router.post('/', Comment.store);

module.exports = router;
