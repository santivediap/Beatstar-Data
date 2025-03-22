const artistsModels = require("../models/artistsModels")

/*
    GET http://localhost:3000/api/artists?page=1
    Get all artists from DB by page
*/
const getAllArtists = async (req, res) => {
    const { page } = req.query
    try {
        if(page && !isNaN(page) && parseInt(page) > 0) {
            const artists = await artistsModels.getAllArtists(page)
            res.status(200).json({
                code: 200,
                page: parseInt(page),
                next_page: artists.next_page,
                artists: artists.artists
            })
        } else {
            const artists = await artistsModels.getAllArtists(1)
            res.status(200).json({
                code: 200,
                page: 1,
                next_page: artists.next_page,
                artists: artists.artists
            })
        }
    } catch (error) {        
        res.status(500).json({
            code: 400,
            error
         })
    }
}

/*
    GET http://localhost:3000/api/artists/:name
    Get artist by name from DB
*/
const getArtistByName = async (req, res) => {
    const { name } = req.params
    try {
        const artist = await artistsModels.getArtistByName(name)
        if(artist) {
            res.status(200).json({
                code: 200,
                id_artist: artist.id_artist
            })
        } else {
            res.status(200).json({
                code: 404,
                message: "Artist not found"
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
    POST http://localhost:3000/api/artists
    Create artist in DB
    {
        "name": "Queen"
    }
*/
const createArtist = async (req, res) => {
    const { name } = req.body
    try {
        const artist = await artistsModels.createArtist(name)
        res.status(200).json({
            code: 200,
            id_artist: artist.id_artist
        })
    } catch (error) {
        res.status(500).json({
            code: 400,
            error
         })
    }
}

/*
    PUT http://localhost:3000/api/artists
    Update artist by id_artist in DB
    {
        "name": "Queen",
        "id": 1
    }
*/
const updateArtist = async (req, res) => {
    const { name, id_genre } = req.body
    try {
        const artist = await artistsModels.updateArtist({ name, id_genre })
        if(artist) {
            res.status(200).json({
                code: 200,
                updated_artist: artist
            })
        } else {
            res.status(200).json({
                code: 404,
                message: "Artist not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 400,
            error
         })
    }
}

/*
    DELETE http://localhost:3000/api/artists
    Delete artist by id_artist in DB
*/
const deleteArtist = async (req, res) => {
    const { id_artist } = req.body
    try {
        const artist = await artistsModels.deleteArtist(id_artist)
        if(artist) {
            res.status(200).json({
                code: 200,
                deleted_artist: artist
            })
        } else {
            res.status(200).json({
                code: 404,
                message: "Artist not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 400,
            error
         })
    }
}

module.exports = {
    getAllArtists,
    getArtistByName,
    createArtist,
    updateArtist,
    deleteArtist
}