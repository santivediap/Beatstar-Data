const songsQueries = require("../queries/songs.queries")
const pool = require("../utils/postgresql")
const artistsModels = require("./artistsModels")
const genresModels = require("./genresModels")

const getAllSongs = async (page) => {
    let client = await pool.connect()
    let result;

    try {
        const data = await client.query(songsQueries.getAllSongs, [(page - 1) * 20])
        let songsCount = await client.query(songsQueries.songsCount)
        songsCount = parseInt(songsCount.rows[0].count)
        result = {
            next_page: songsCount > page * 20,
            songs: data.rows
        }
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const getSuggestedSongs = async (search) => {
    let client = await pool.connect()
    let result;

    try {
        const data = await client.query(songsQueries.getSuggestedSongs.replace("$1", search))
        result = data.rows
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const createSong = async (songData) => {
    const { song_title, difficulty, duration, is_deluxe, stages, image, artists, genres } = songData
    let client = await pool.connect()
    let result;

    try {
        const songData = await client.query(songsQueries.createSong, [song_title, difficulty, duration, is_deluxe, stages, image])
        const songId = songData.rows[0].id_song

        // Insert artists that features into the song
        for(let i = 0; i < artists.length; i++) {
            const artist = await artistsModels.getArtistByName(artists[i])
            if(artist) {
                const data = await client.query(songsQueries.createSongArtists, [songId, artist.id_artist])
            } else {
                const newArtistId = await artistsModels.createArtist(artists[i])
                const data = await client.query(songsQueries.createSongArtists, [songId, newArtistId.id_artist])
            }
        }

        // Insert genres that are into the song
        for(let i = 0; i < genres.length; i++) {
            const genre = await genresModels.getGenreByName(genres[i])
            if(genre) {
                const data = await client.query(songsQueries.createSongGenres, [songId, genre.id_genre])
            }
        }

        result = {
            id_song: songId,
            genres,
            artists
        }
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const updateSong = async (songData) => {
    const { song_title, difficulty, duration, is_deluxe, stages, image, id_song } = songData
    let client = await pool.connect()
    let result;

    try {
        const searchSong = await client.query(songsQueries.getSongById, [id_song])
        if(searchSong.rows.length) {
            const data = await client.query(songsQueries.updateSong, [song_title, difficulty, duration, is_deluxe, stages, image, id_song])
            result = data.rows[0]
        }
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const deleteSong = async (id_song) => {
    let client = await pool.connect()
    let result;

    try {
        const searchSong = await client.query(songsQueries.getSongById, [id_song])
        if(searchSong.rows.length) {
            const data = await client.query(songsQueries.deleteSong, [id_song])
            result = data.rows[0]
        }
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

module.exports = {
    getAllSongs,
    getSuggestedSongs,
    createSong,
    updateSong,
    deleteSong,
}