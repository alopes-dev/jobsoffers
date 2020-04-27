const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const PessoaDocumento = db.define('PessoaDocumentos', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    DocumentoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
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

module.exports = PessoaDocumento;