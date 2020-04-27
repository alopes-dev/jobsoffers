const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const OportunidadeCompetencia = db.define('OportunidadeCompetencias', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    CompetenciaId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    OportunidadeId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },

    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = OportunidadeCompetencia;