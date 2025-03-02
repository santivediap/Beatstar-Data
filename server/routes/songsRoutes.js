const express = require('express');

// Users routes
const songsApiControllers = require("../controllers/songsControllers");
const songsApiRouter = express.Router();

songsApiRouter.post('/', songsApiControllers.createSong);
songsApiRouter.get('/:title', songsApiControllers.getSongByTitle);
songsApiRouter.put('/', songsApiControllers.updateSong);
songsApiRouter.delete('/', songsApiControllers.deleteSong);

module.exports = songsApiRouter;