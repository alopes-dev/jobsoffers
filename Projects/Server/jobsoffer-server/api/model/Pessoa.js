const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Pessoa = db.define('Pessoa', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    SobreNome: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    DataNascimento: {
        type: Sequelize.DATE,
        notEmpty: false
    },
    ContactoId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    DocumentoId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    CidadeId: {
        type: Sequelize.DATE,
        notEmpty: false
    },
    Foto: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Pessoa;