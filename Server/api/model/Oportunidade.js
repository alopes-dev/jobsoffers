const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Oportunidade = db.define('Oportunidades', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    CargaHoraria: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    DataLimite: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    Salario: {
        type: Sequelize.FLOAT,
        notEmpty: false,
    },

    IsFinalizado: {
        type: Sequelize.INTEGER,
        notEmpty: false,
    },
    Status: {
        type: Sequelize.INTEGER,
        notEmpty: false,
    },
    Cidade: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    TipoEmpregoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    CargoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    TipoFormacaoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    TipoFuncaoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    ProvinciaId: {
        type: Sequelize.STRING(50),
    },
    EmpresaId: {
        type: Sequelize.STRING(50),
    },
    NacionalidadeId: {
        type: Sequelize.STRING(50),
    },
    Experiencia: {
        type: Sequelize.STRING(50),
    },
    NumVagas: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    Detalhes: {
        type: Sequelize.STRING(50),
    },
});

module.exports = Oportunidade;