const express = require('express')
const genresRouter = express.Router()
const genresControllers = require('../controllers/genresControllers')

genresRouter.get('/', genresControllers.getAllGenres)
genresRouter.post('/', genresControllers.createGenre)
genresRouter.get('/:name', genresControllers.getGenreByName)
genresRouter.put('/', genresControllers.updateGenre)
genresRouter.delete('/', genresControllers.deleteGenre)

module.exports = genresRouter