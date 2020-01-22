const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Oportunidade = db.define('Oportunidade', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    CargaHoraria: {
        type: Sequelize.INTEGER,
        notEmpty: false
    },
    Salario: {
        type: Sequelize.FLOAT,
        notEmpty: false
    },
    Localizacao: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    IsFinalizado: {
        type: Sequelize.INTEGER,
        notEmpty: false
    },
    CidadeId: {
        type: Sequelize.DATE,
        notEmpty: false
    },
    BeneficioId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    EmpregadorId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    CargoId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Oportunidade;