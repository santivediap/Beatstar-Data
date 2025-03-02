const express = require('express');

// Users routes
const songsApiControllers = require("../controllers/songsControllers");
const songsApiRouter = express.Router();

songsApiRouter.post('/', songsApiControllers.createSong);

module.exports = songsApiRouter;