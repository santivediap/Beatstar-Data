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
            message: query
        })
        
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

module.exports = {
    createSong
}