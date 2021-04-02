const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Empresa = db.define('Empresa', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    Designacao: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    Nif: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    RazaoSocial: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    Missao: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    Telefone: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    DataCriacao: {
        type: Sequelize.DATE,
        notEmpty: false,
    },
    
    Visao: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = Empresa;