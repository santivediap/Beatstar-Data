db_queries_genre = {
    getAllGenres: `SELECT * FROM genre`,
    getGenreByName: `SELECT id_genre FROM genre WHERE name = $1`,
    getGenreById: `SELECT * FROM genre WHERE id_genre = $1`,
    createGenre: `INSERT INTO genre(name) VALUES($1) RETURNING id_genre`,
    updateGenre: `UPDATE genre
    SET name=$1 WHERE id_genre=$2 RETURNING id_genre, name`,
    deleteGenre: `DELETE FROM genre WHERE id_genre=$1 RETURNING id_genre, name`,
}

module.exports = db_queries_genre;