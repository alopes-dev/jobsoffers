const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const PessoaContacto = db.define('PessoaContactos', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    ContactoId: {
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

module.exports = PessoaContacto;