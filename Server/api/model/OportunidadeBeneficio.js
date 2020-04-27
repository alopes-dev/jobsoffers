const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const OportunidadeBeneficio = db.define('OportunidadeBeneficios', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    BeneficioId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    OportunidadeId: {
        type: Sequelize.STRING(50),
        notEmpty: false
    },

    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = OportunidadeBeneficio;