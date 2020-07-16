const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const CurriculoSkills = require('../model/CurriculoSkills');
const Estado = require('../model/Estado');
const Curriculo = require('../model/Curriculo');
const Skills = require('../model/Skills');

const { SkillsType } = require('./SkillsSchema');
const { EstadoType } = require('./EstadoSchema');

const CurriculoSkillsType = new GraphQLObjectType({
    name: 'CurriculoSkillsObject',
    fields: () => ({
        Id: { type: GraphQLString },
        CurriculoId: { type: GraphQLString },
        SkillsId: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
        Skills: {
            type: SkillsType,
            resolve(prev, args) {
                return Skills.findOne({
                        where: { Id: prev.SkillsId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
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

const CurriculoSkillsResolve = {
    CurriculoSkills: {
        type: new GraphQLList(CurriculoSkillsType),
        resolve(parent, args) {
            return CurriculoSkills.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    CurriculoSkill: {
        type: CurriculoSkillsType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return CurriculoSkills.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { CurriculoSkillsResolve, CurriculoSkillsType };