const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const OportunidadeIdioma = db.define('OportunidadeIdiomas', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    IdiomaId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    OportunidadeId: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },

    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = OportunidadeIdioma;