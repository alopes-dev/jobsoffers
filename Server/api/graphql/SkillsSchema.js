const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const Skills = require('../model/Skills');
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

module.exports = { SkillsResolve, SkillsType };