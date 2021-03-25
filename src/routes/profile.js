const express = require('express');
const ProfileImage = require('../controllers/ProfileImage');

const router = express.Router();

router.post('/image', ProfileImage.store);

module.exports = router;
