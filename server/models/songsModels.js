const Songs = require("../schemas/songs")
const { Op } = require("sequelize");

const createSong = async (songData) => {
    const { title, genre, difficulty, duration, stages, image } = songData
    const query = await Songs.create({ title, genre, difficulty, duration, stages, image })
    return query
}

const getSongByTitle = async (title) => {
    const query = await Songs.findOne({ where: { title: title } })
    return query
}

const getSuggestedSongs = async (search) => {
    let regex = "(?i)"

    const separatedSearchWords = search.split(" ")

    for(let i = 0; i < separatedSearchWords.length; i++) {
        let currentWord = separatedSearchWords[i]

        if(currentWord.length > 1) {
            currentWord = currentWord.slice(0, currentWord.length - 1)
        }

        if(separatedSearchWords.length - 1 > i) {
            regex += `${ currentWord }\\w+|`
        } else {
            regex += `${ currentWord }\\w+`
        }
    }
    
    const query = await Songs.findAll({ where: { title: { [Op.regexp]: regex } } })
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
    getSuggestedSongs,
    updateSong,
    deleteSong,
}