const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql');
const uuid = require('uuid/v4');
const Skills = require('../model/Skills');
const CurriculoSkills = require('../model/CurriculoSkills');
const Estado = require('../model/Estado');
const { EstadoType } = require('./EstadoSchema');

const SkillsType = new GraphQLObjectType({
    name: 'SkillsObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Percentagem: { type: GraphQLString },
        Descricao: { type: GraphQLString },
        Status: { type: GraphQLInt },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({
                        where: { Id: prev.EstadoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const SkillsResolve = {
    Skills: {
        type: new GraphQLList(SkillsType),
        resolve(parent, args) {
            return Skills.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Skill: {
        type: SkillsType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Skills.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const SkillsInput = new GraphQLInputObjectType({
    name: 'SkillsInput',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Descricao: { type: GraphQLString },
        Percentagem: { type: GraphQLString },
        CurriculoId: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const SkillsMutation = {
    addSkills: {
        type: SkillsType,
        args: {
            input: {
                type: SkillsInput,
            },
        },
        async resolve(_, { input: { CurriculoId, ...rest } }) {
            const sequelize = require('../database/dbSetting');
            const t = await sequelize.transaction();

            try {
                const sysdate = new Date(Date.now());

                const skills = await Skills.create({
                    Id: uuid(),
                    ...rest,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                if (!skills) throw new Error('Error');

                console.log(skills.dataValues);
                const { Id } = skills.dataValues;
                console.log(CurriculoId, Id);
                await CurriculoSkills.create({
                    Id: uuid(),
                    CurriculoId,
                    SkillsId: Id,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                await t.commit();
                return skills;
            } catch (error) {
                await t.rollback();
                throw new Error(error.message);
            }
        },
    },
};

module.exports = { SkillsResolve, SkillsType, SkillsMutation };