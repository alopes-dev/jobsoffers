const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const CurriculoDetalhe = db.define('CurriculoDetalhe', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    CurriculoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    DetalheId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },

    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = CurriculoDetalhe;