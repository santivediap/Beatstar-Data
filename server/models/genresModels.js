const genresQueries = require("../queries/genre.queries")
const pool = require("../utils/postgresql")

const getAllGenres = async () => {
    let client = await pool.connect()
    let result;

    try {
        client = await pool.connect()
        const data = await client.query(genresQueries.getAllGenres, [])
        result = data.rows
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const createGenre = async (genreData) => {
    const { name } = genreData
    let client = await pool.connect()
    let result;

    try {
        const data = await client.query(genresQueries.createGenre, [name])
        result = data.rows[0]
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const getGenreByName = async (name) => {
    let client = await pool.connect()
    let result;

    try {
        const data = await client.query(genresQueries.getGenreByName, [name])
        result = data.rows[0]
    } catch(error) {        
        throw error
    } finally {
        client.release();
    }

    return result
}

const updateGenre = async (genreData) => {
    const { name, id_genre } = genreData
    let client = await pool.connect()
    let result;

    try {
        const searchGenre = await client.query(genresQueries.getGenreById, [id_genre])
        if(searchGenre.rows.length) {
            const data = await client.query(genresQueries.updateGenre, [name, id_genre])
            result = data.rows[0]
        }
    } catch(error) {
        throw error
    } finally {
        client.release();
    }

    return result
}

const deleteGenre = async (id) => {
    let client = await pool.connect()
    let result;

    try {
        const searchGenre = await client.query(genresQueries.getGenreById, [id])
        if(searchGenre.rows.length) {
            const data = await client.query(genresQueries.deleteGenre, [id])
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
    getAllGenres,
    createGenre,
    getGenreByName,
    updateGenre,
    deleteGenre
}