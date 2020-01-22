const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Estado = db.define('estados', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Designacao: {
        type: Sequelize.STRING,
        notEmpty: true
    }
});

module.exports = Estado;