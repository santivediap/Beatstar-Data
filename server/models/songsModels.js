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

const updateSong = async (songData) => {
    const { title, genre, difficulty, duration, stages, image, searchedTitle } = songData
    const query = await Songs.update({ title, genre, difficulty, duration, stages, image }, { where: { title: searchedTitle } })
    return query
}

module.exports = {
    createSong,
    getSongByName,
    updateSong,
}