const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const PessoaIdioma = db.define('PessoaIdiomas', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    Percentagem: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    IdiomaId: {
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

module.exports = PessoaIdioma;