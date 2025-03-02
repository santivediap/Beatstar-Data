const songsModels = require("../models/songsModels")

/*
    POST http://localhost:3000/api/songs
    Create new song in DB
*/
const createSong = async (req, res) => {
    try {
        const { title, genre, difficulty, duration, stages, image } = req.body
        const stagesFixed = []

        // Refactor stages names
        for(let i = 0; i < stages.length; i++) {
            if(i == 0) {
                stagesFixed.push({ stageName: "Intro Stage", stageValue: stages[i] })
            } else if(i == stages.length - 1) {
                stagesFixed.push({ stageName: "Final Stage", stageValue: stages[i] })
            } else {
                stagesFixed.push({ stageName: `Stage ${ i + 1 }`, stageValue: stages[i] })
            }
        }

        const query = await songsModels.createSong({ title, genre, difficulty, duration, stages: stagesFixed, image })
        
        res.status(200).json({
            code: 200,
            query
        })
        
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
        })
    }
}

/*
    GET http://localhost:3000/api/songs/:title
    Get song by title from DB
*/
const getSongByTitle = async (req, res) => {
    try {
        const { title } = req.params

        const query = await songsModels.getSongByTitle(title)
        res.status(200).json({
            code: 200,
            query
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
        })
    }
}

/*
    GET http://localhost:3000/api/songs/suggestions/:searchedTitle
    Get songs list by matching title from DB
*/
const getSuggestedSongs = async (req, res) => {
    try {
        const { searchedTitle } = req.params
        
        const query = await songsModels.getSuggestedSongs(searchedTitle)
        res.status(200).json({
            code: 200,
            query
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
    Update song by title in DB
*/
const updateSong = async (req, res) => {
    try {
        const { title, genre, difficulty, duration, stages, image, searchedTitle } = req.body

        const query = songsModels.updateSong({ title, genre, difficulty, duration, stages, image, searchedTitle })
        res.status(200).json({
            code: 200,
            query: "Update successful"
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
        })
    }
}

/*
    DELETE http://localhost:3000/api/songs
    Delete song by title in DB
*/
const deleteSong = async (req, res) => {
    try {
        const { title } = req.body
        
        const query = await songsModels.deleteSong(title)
        res.status(200).json({
            code: 200,
            query: "Delete successful"
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error
        })
    }
}

module.exports = {
    createSong,
    getSongByTitle,
    getSuggestedSongs,
    updateSong,
    deleteSong,
}