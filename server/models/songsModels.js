const Songs = require("../schemas/songs")

const createSong = async (songData) => {
    const { title, genre, difficulty, duration, stages, image } = songData
    const query = await Songs.create({ title, genre, difficulty, duration, stages, image })
    return query
}

const getSongByTitle = async (title) => {
    const query = await Songs.findOne({ where: { title: title } })
    return query
}

const updateSong = async (songData) => {
    const { title, genre, difficulty, duration, stages, image, searchedTitle } = songData
    const query = await Songs.update({ title, genre, difficulty, duration, stages, image }, { where: { title: searchedTitle } })
    return query
}

const deleteSong = async (title) => {
    const query = await Songs.destroy({ where: { title } })
    return query
}

module.exports = {
    createSong,
    getSongByTitle,
    updateSong,
    deleteSong,
}