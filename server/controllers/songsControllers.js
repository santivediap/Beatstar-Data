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
    GET http://localhost:3000/api/songs/:songName
    Get song by name from DB
*/
const getSongByName = async (req, res) => {
    try {
        const { songName } = req.params

        const query = await songsModels.getSongByName(songName)
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

module.exports = {
    createSong,
    getSongByName,
}