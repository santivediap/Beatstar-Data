db_queries_songs = {
    getAllSongs: `SELECT * FROM song LIMIT 20 OFFSET $1`,
    getSongById: `SELECT * FROM song WHERE id_song = $1`,
    getSuggestedSongs: `SELECT s.id_song, s.song_title, s.difficulty, s.stages, s.duration, s.image, STRING_AGG(DISTINCT g.name, ', ') AS genres, STRING_AGG(DISTINCT a.name, ', ') AS artists
                            FROM song s
                            JOIN song_artists sa ON s.id_song = sa.id_song
                            JOIN artist a ON sa.id_artist = a.id_artist
                            LEFT JOIN song_genres sg ON s.id_song = sg.id_song
                            LEFT JOIN genre g ON sg.id_genre = g.id_genre
                            WHERE s.song_title ILIKE '%$1%'
                            GROUP BY s.id_song
                            LIMIT 20;`,
    songsCount: `SELECT COUNT(*) FROM song`,
    createSong: `INSERT INTO song (song_title, difficulty, duration, stages, image) VALUES ($1, $2, $3, $4, $5) RETURNING id_song`,
    createSongArtists: `INSERT INTO song_artists (id_song, id_artist) VALUES ($1, $2)`,
    createSongGenres: `INSERT INTO song_genres (id_song, id_genre) VALUES ($1, $2)`,
    getSongById: `SELECT * FROM song WHERE id_song = $1`,
    updateSong: `UPDATE song SET song_title = $1, difficulty = $2, duration = $3, stages = $4, image = $5 WHERE id_song = $6 RETURNING id_song, song_title, difficulty, duration, stages, image`,
    deleteSong: `DELETE FROM song WHERE id_song = $1 RETURNING id_song, song_title, difficulty, duration, stages, image`,
}

module.exports = db_queries_songs;