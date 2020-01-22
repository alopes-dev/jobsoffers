const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const Contacto = db.define('Contacto', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Telefone: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    TelefoneAlternativo: {
        type: Sequelize.STRING,
        notEmpty: false
    },
    Email: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    EmailAlternativo: {
        type: Sequelize.STRING(50),
        notEmpty: true
    },
    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true
    }
});

module.exports = Contacto;