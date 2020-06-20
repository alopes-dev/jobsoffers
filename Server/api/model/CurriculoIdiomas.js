const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const CurriculoIdiomas = db.define('CurriculoIdiomas', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    CurriculoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    IdiomaId: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    Percentagem: {
        type: Sequelize.INTEGER,
        notEmpty: false,
    },

    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = CurriculoIdiomas;