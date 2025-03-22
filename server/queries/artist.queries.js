db_queries_artist = {
    getAllArtists: `SELECT * FROM artist LIMIT 20 OFFSET $1`,
    getArtistByName: `SELECT id_artist FROM artist WHERE name = $1`,
    getArtistById: `SELECT * FROM artist WHERE id_artist = $1`,
    createArtist: `INSERT INTO artist(name) VALUES($1) RETURNING id_artist`,
    artistsCount: `SELECT COUNT(*) FROM artist`,
    updateArtist: `UPDATE artist SET name = $1 WHERE id_artist = $2 RETURNING id_artist, name`,
    deleteArtist: `DELETE FROM artist WHERE id_artist = $1 RETURNING id_artist, name`
}

module.exports = db_queries_artist;