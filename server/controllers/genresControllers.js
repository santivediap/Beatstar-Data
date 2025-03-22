const genresModels = require("../models/genresModels")

/*
    GET http://localhost:3000/api/genres
    Get all genres from DB
*/
const getAllGenres = async (req, res) => {
    try {
        const genres = await genresModels.getAllGenres()
        res.status(200).json({
            code: 200,
            genres
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            code: 400,
            error
         })
    }
}

/*
    POST http://localhost:3000/api/genres
    Create genre in DB
    {
        "name": "Rock"
    }
*/
const createGenre = async (req, res) => {
    try {
        const { name } = req.body
        const createdGenre = await genresModels.createGenre({ name })
        res.status(201).json({
            code: 200,
            id_genre: createdGenre.id_genre
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
         })
    }
}

/*
    GET http://localhost:3000/api/genres/:name
    Get genre by name from DB
*/
const getGenreByName = async (req, res) => {
    try {
        const { name } = req.params
        const genre = await genresModels.getGenreByName(name)
        
        if(genre) {
            res.status(200).json({
                code: 200,
                genre: genre.id_genre
            })
        } else {
            res.status(200).json({
                code: 404,
                message: "Genre not found"
            })
        }
    } catch (error) {
        console.log(error);
        
        res.status(400).json({
            code: 400,
            error
         })
    }
}

/*
    UPDATE http://localhost:3000/api/genres
    Update genre by id_genre in DB
    {
        "name": "Rock",
        "id": 1
    }
*/
const updateGenre = async (req, res) => {
    try {
        const { name, id_genre } = req.body
        const updatedGenre = await genresModels.updateGenre({ name, id_genre })
        if(updatedGenre) {
            res.status(200).json({
                code: 200,
                updated_genre: updatedGenre
            })
        } else {
            res.status(200).json({
                code: 404,
                message: "Genre not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
         })
    }
}

/*
    DELETE http://localhost:3000/api/genres
    Delete genre by id_genre in DB
    {
        "id_genre": 1
    }
*/
const deleteGenre = async (req, res) => {
    try {
        const { id_genre } = req.body
        const deletedGenre = await genresModels.deleteGenre(id_genre)
        if(deletedGenre) {
            res.status(200).json({
                code: 200,
                deleted_genre: deletedGenre
            })
        } else {
            res.status(200).json({
                code: 404,
                message: "Genre not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
         })
    }
}

module.exports = {
    getAllGenres,
    createGenre,
    getGenreByName,
    updateGenre,
    deleteGenre,
}