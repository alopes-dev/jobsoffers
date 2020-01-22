const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Documento = db.define('Documento', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    NumDocumento: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    TipoDocumentoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Documento;