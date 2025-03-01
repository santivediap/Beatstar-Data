const { Sequelize } = require('sequelize');
require('dotenv').config()

const db = new Sequelize(process.env.POSTGRESQL_CONNECTION,
{ logging: false });

const connectSQL = async () => {
    try {
        await db.authenticate();
        console.log('PostgreSQL database connected...');
    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};


module.exports = {
    connectSQL,
    db
}