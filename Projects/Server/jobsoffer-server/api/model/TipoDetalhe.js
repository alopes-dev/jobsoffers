const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const TipoDetalhe = db.define('TipoDetalhe', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Designacao: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    Descricao: {
        type: Sequelize.STRING,
        notEmpty: false
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = TipoDetalhe;