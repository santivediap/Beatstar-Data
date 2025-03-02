const express = require('express');

// Users routes
const songsApiControllers = require("../controllers/songsControllers");
const songsApiRouter = express.Router();

songsApiRouter.post('/', songsApiControllers.createSong);
songsApiRouter.get('/:title', songsApiControllers.getSongByTitle);
songsApiRouter.get('/suggestions/:searchedTitle', songsApiControllers.getSuggestedSongs);
songsApiRouter.put('/', songsApiControllers.updateSong);
songsApiRouter.delete('/', songsApiControllers.deleteSong);

module.exports = songsApiRouter;