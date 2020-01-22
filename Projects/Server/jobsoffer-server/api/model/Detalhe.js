const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Detalhe = db.define('Detalhe', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Designacao: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    NomeDaInstituicao: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    DescricaoDaInstituicao: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    LocalDaInstituicao: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    DataInicio: {
        type: Sequelize.DATE,
        notEmpty: false
    },
    DataFim: {
        type: Sequelize.DATE,
        notEmpty: false
    },
    TipoDetalheId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Detalhe;