const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Curriculo = db.define('Curriculo', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Designacao: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    CandidatoId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },

    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Curriculo;