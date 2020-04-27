const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Idioma = db.define('Idiomas', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    Designacao: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    Status: {
        type: Sequelize.INTEGER,
        notEmpty: true,
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = Idioma;