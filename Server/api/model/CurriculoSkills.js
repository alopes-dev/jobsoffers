const Sequelize = require('sequelize');
const db = require('../database/dbSetting');

const CurriculoHobes = db.define('CurriculoSkills', {
    Id: {
        type: Sequelize.STRING(50),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    CurriculoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
    SkillsId: {
        type: Sequelize.STRING(50),
        notEmpty: false,
    },

    EstadoId: {
        type: Sequelize.STRING(50),
        notEmpty: true,
    },
});

module.exports = CurriculoHobes;