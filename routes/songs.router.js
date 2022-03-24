const express = require('express');
const router = express.Router();

const songs_controller = require('../controllers/songs.controller');


router.get('/', songs_controller.index);
router.get('/:id', songs_controller.show)
router.post('/', songs_controller.create);
router.post('/:id', songs_controller.update)
router.delete('/:id', songs_controller.destroy)


module.exports = router;
