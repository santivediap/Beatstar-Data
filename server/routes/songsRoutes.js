const express = require('express');

// Users routes
const songsApiControllers = require("../controllers/songsControllers");
const songsApiRouter = express.Router();

songsApiRouter.post('/', songsApiControllers.createSong);
songsApiRouter.get('/:songName', songsApiControllers.getSongByName);

module.exports = songsApiRouter;