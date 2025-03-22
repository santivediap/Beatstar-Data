const artistsQueries = require("../queries/artist.queries")
const pool = require("../utils/postgresql")

const getAllArtists = async (page) => {
    let client = await pool.connect()
    let result;

    try {
        const data = await client.query(artistsQueries.getAllArtists, [(page - 1) * 20])
        let artistsCount = await client.query(artistsQueries.artistsCount)
        artistsCount = parseInt(artistsCount.rows[0].count)
        result = {
            next_page: artistsCount > page * 20,
            artists: data.rows
        }
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const getArtistByName = async (name) => {
    let client = await pool.connect()
    let result;

    try {
        const data = await client.query(artistsQueries.getArtistByName, [name])
        result = data.rows[0]
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const createArtist = async (name) => {
    let client = await pool.connect()
    let result;

    try {
        const data = await client.query(artistsQueries.createArtist, [name])
        result = data.rows[0]
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const updateArtist = async (artistData) => {
    const { name, id_genre } = artistData
    let client = await pool.connect()
    let result;

    try {
        const searchArtist = await client.query(artistsQueries.getArtistById, [id_genre])
        if(searchArtist.rows.length) {
            const data = await client.query(artistsQueries.updateArtist, [name, id_genre])
            result = data.rows[0]
        } 
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const deleteArtist = async (id) => {
    let client = await pool.connect()
    let result;

    try {
        const searchArtist = await client.query(artistsQueries.getArtistById, [id])
        if(searchArtist.rows.length) {
            const data = await client.query(artistsQueries.deleteArtist, [id])
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
    getAllArtists,
    getArtistByName,
    createArtist,
    updateArtist,
    deleteArtist
}