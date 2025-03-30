const songsModels = require('../models/songsModels');

/*
    GET http://localhost:3000/api/songs?page=1
    Get all songs from DB by page
*/
const getAllSongs = async (req, res) => {
    const { page } = req.query
    try {
        if(page && !isNaN(page) && parseInt(page) > 0) {
            const songs = await songsModels.getAllSongs(page)
            res.status(200).json({
                code: 200,
                page: parseInt(page),
                next_page: songs.next_page,
                songs: songs.songs
            })
        } else {
            const songs = await songsModels.getAllSongs(1)
            res.status(200).json({
                code: 200,
                page: 1,
                next_page: songs.next_page,
                songs: songs.songs
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

const getSuggestedSongs = async (req, res) => {
    const { search } = req.params
    try {
        const songs = await songsModels.getSuggestedSongs(search)
        if(songs) {
            res.status(200).json({
                code: 200,
                songs
            })
        } else {
            res.status(200).json({
                code: 200,
                songs: []
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
    POST http://localhost:3000/api/songs
    Create song in DB
    {
        "song_title": "Just Dance",
        "difficulty": "Normal",
        "duration": "1:59",
        "stages": [2426, 8733, 18693, 30934, 50000],
        "image": "https://beatscore.eu/image/cover/50"
    }
*/
const createSong = async (req, res) => {
    const { song_title, difficulty, duration, stages, image, artists, genres } = req.body
    try {
        const song = await songsModels.createSong({ song_title, difficulty, duration, stages, image, artists, genres })
        res.status(200).json({
            code: 200,
            id_song: song.id_song,
            genres: song.genres,
            artists: song.artists
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
        })
    }
}

/*
    PUT http://localhost:3000/api/songs
    Update song by song_id in DB
    {
        "song_title": "Just NOT Dance",
        "difficulty": "Normal",
        "duration": "1:59",
        "stages": [2426, 8733, 18693, 30934, 50000],
        "image": "https://beatscore.eu/image/cover/50",
        "id_song": 1
    }
*/
const updateSong = async (req, res) => {
    const { song_title, difficulty, duration, stages, image, id_song } = req.body
    try {
        const song = await songsModels.updateSong({ song_title, difficulty, duration, stages, image, id_song })
        if(song) {
            res.status(200).json({
                code: 200,
                updated_song: song
            })
        } else {
            res.status(200).json({
                code: 404,
                msg: "Song not found"
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
    DELETE http://localhost:3000/api/songs
    Delete song by song_id in DB
    {
        "id_song": 1
    }
*/
const deleteSong = async (req, res) => {
    const { id_song } = req.body
    try {
        const song = await songsModels.deleteSong(id_song)
        if(song) {
            res.status(200).json({
                code: 200,
                deleted_song: song
            })
        } else {
            res.status(200).json({
                code: 404,
                msg: "Song not found"
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
    getAllSongs,
    getSuggestedSongs,
    createSong,
    updateSong,
    deleteSong,
}