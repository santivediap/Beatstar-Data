const express = require('express')
const artistsRouter = express.Router()
const artistsControllers = require('../controllers/artistsControllers')

artistsRouter.get('/', artistsControllers.getAllArtists)
artistsRouter.get('/:name', artistsControllers.getArtistByName)
artistsRouter.post('/', artistsControllers.createArtist)
artistsRouter.put('/', artistsControllers.updateArtist)
artistsRouter.delete('/', artistsControllers.deleteArtist)

module.exports = artistsRouter