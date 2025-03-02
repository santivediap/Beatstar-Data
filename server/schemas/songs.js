const { db } = require('../utils/postgresql');
const { DataTypes } = require('sequelize');

const Songs = db.define("Songs", {
    song_id: {
        field: 'song_id',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        field: 'title',
        type: DataTypes.STRING(60)
    },
    genre: {
        field: 'genre',
        type: DataTypes.STRING(30),
    },
    difficulty: {
        field: 'difficulty',
        type: DataTypes.STRING(20),
    },
    duration: {
        field: 'duration',
        type: DataTypes.STRING(10),
    },
    stages: {
        field: 'stages',
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    image: {
        field: 'image',
        type: DataTypes.STRING(200),
    }
},
    {
        db,
        modelName: 'Songs',
        tableName: 'songs',
        timestamps: 'false',
        createdAt: false,
        updatedAt: false,
    }
);

Songs.sync();

module.exports = Songs;