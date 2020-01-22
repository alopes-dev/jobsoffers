const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Candidatura = db.define('Candidatura', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    CandidatoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    OprotunidadeId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Candidatura;