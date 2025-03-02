const Songs = require("../schemas/songs")

const createSong = async (songData) => {
    const { title, genre, difficulty, duration, stages, image } = songData
    const query = await Songs.create({ title, genre, difficulty, duration, stages, image })
    return query
}

const getSongByName = async (songName) => {
    const query = await Songs.findOne({ where: { title: songName } })
    return query
}

module.exports = {
    createSong,
    getSongByName,
}