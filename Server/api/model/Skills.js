const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Hobes = db.define('Skills', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    Designacao: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    Percentagem: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    Descricao: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = Hobes;