const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const ContaUsuario = db.define('ContaUsuario', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    UserName: {
        type: Sequelize.STRING,
        notEmpty: true,
    },
    Email: {
        type: Sequelize.STRING,
        notEmpty: true,
    },
    EmailAlternativo: {
        type: Sequelize.STRING,
        notEmpty: true,
    },
    Role: {
        type: Sequelize.STRING,
        notEmpty: true,
    },
    PassWord: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    PessoaId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = ContaUsuario;