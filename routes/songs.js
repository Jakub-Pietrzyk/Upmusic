const express = require('express');
const router = express.Router();

const songs_controller = require('../controllers/songsController');


router.get('/', songs_controller.index);


module.exports = router;
