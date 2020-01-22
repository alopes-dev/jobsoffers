const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Cidade = db.define('Cidade', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Designacao: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Cidade;