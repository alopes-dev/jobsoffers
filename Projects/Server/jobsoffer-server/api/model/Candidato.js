const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Candidato = db.define('Candidato', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    IsFavorito: {
        type: Sequelize.INTEGER,
        notEmpty: false
    },
    PessoaId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Candidato;