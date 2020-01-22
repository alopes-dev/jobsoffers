const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const SectorDeAtividade = db.define('SectorDeAtividades', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    Designacao: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    EstadoId: {
        type: Sequelize.STRING(50),
    },
});

module.exports = SectorDeAtividade;