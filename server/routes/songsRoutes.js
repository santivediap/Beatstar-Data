const express = require('express');

// Songs routes
const songsApiControllers = require("../controllers/songsControllers");
const songsApiRouter = express.Router();

songsApiRouter.get("/", songsApiControllers.getAllSongs);
songsApiRouter.get("/suggest/:search", songsApiControllers.getSuggestedSongs);
songsApiRouter.post("/", songsApiControllers.createSong);
songsApiRouter.put("/", songsApiControllers.updateSong);
songsApiRouter.delete("/", songsApiControllers.deleteSong);

module.exports = songsApiRouter;