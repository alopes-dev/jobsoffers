const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const SolicitacaoDocumento = db.define('SolicitacaoDocumentos', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    DetalheEspecifico: {
        type: Sequelize.STRING,
        notEmpty: false,
    },
    TipoDocunentoId: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    Status: {
        type: Sequelize.INTEGER,
        notEmpty: false,
    },
    CandidaturaId: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    PessoaId: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = SolicitacaoDocumento;