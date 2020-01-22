require('dotenv').config()
const Sequelize = require('sequelize');

const { DATABASE_CATALOG, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_DIALECT } = process.env;
module.exports = new Sequelize(DATABASE_CATALOG, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    dialectOptions: {
        encrypt: true
    }
});