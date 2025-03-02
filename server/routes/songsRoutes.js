const express = require('express');

// Users routes
const songsApiControllers = require("../controllers/songsControllers");
const songsApiRouter = express.Router();

songsApiRouter.post('/', songsApiControllers.createSong);
songsApiRouter.get('/:songName', songsApiControllers.getSongByName);
songsApiRouter.put('/', songsApiControllers.updateSong);

module.exports = songsApiRouter;