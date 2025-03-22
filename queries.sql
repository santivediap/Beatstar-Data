-- Create genre table
CREATE TABLE genre (
    id_genre SERIAL NOT NULL,
    name VARCHAR(20) NOT NULL UNIQUE,
    PRIMARY KEY(id_genre)
)

-- Create artist table
CREATE TABLE artist (
    id_artist SERIAL NOT NULL,
    name VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY(id_artist)
)

-- Create song table
CREATE TABLE song (
    id_song SERIAL NOT NULL,
    song_title VARCHAR(30) NOT NULL UNIQUE,
    difficulty VARCHAR(20) NOT NULL,
    stages VARCHAR(20)[] NOT NULL,
    duration VARCHAR(10) NOT NULL,
    image VARCHAR(200) NOT NULL,
    PRIMARY KEY(id_song)
)

-- Create song_artists table
CREATE TABLE song_artists (
    id_artist INT REFERENCES artist(id_artist) ON DELETE CASCADE,
    id_song INT REFERENCES song(id_song) ON DELETE CASCADE,
    PRIMARY KEY(id_artist, id_song)
)

-- Create song_genres table
CREATE TABLE song_genres (
    id_song INT REFERENCES song(id_song) ON DELETE CASCADE,
    id_genre INT REFERENCES genre(id_genre) ON DELETE CASCADE,
    PRIMARY KEY(id_song, id_genre)
)