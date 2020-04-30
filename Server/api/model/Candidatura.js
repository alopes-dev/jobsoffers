const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Candidatura = db.define('Candidaturas', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    CandidatoId: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    IsAnalizado: {
        type: Sequelize.INTEGER,
        notEmpty: false,
    },
    Status: {
        type: Sequelize.INTEGER,
        notEmpty: false,
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

module.exports = Candidatura;