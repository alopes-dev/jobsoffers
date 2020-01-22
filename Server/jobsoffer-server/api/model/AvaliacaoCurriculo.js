const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const AvaliacaoCurriculo = db.define('AvaliacaoCurriculo', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Designacao: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    IsFavorito: {
        type: Sequelize.INTEGER,
        notEmpty: false
    },
    OportunidadeId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    CurriculoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = AvaliacaoCurriculo;