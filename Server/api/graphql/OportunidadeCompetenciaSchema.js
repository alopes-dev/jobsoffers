const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const OportunidadeCompetencia = require('../model/OportunidadeCompetencia');
const Estado = require('../model/Estado');
const Oportunidade = require('../model/Oportunidade');
const Competencia = require('../model/Competencia');

const { OportunidadeType } = require('./oportunidade/type');
const { CompetenciaType } = require('./CompetenciasSchema');
const { EstadoType } = require('./EstadoSchema');

const OportunidadeCompetenciaType = new GraphQLObjectType({
    name: 'OportunidadeCompetenciasList',
    fields: () => ({
        Id: { type: GraphQLString },
        CompetenciaId: { type: GraphQLString },
        Competencia: {
            type: CompetenciaType,
            resolve(prev, args) {
                return Competencia.findOne({
                        where: { Id: prev.CompetenciaId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeId: { type: GraphQLString },
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

const OportunidadeCompetenciaResolve = {
    OportunidadeCompetencias: {
        type: new GraphQLList(OportunidadeCompetenciaType),
        resolve(parent, args) {
            return OportunidadeCompetencia.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    OportunidadeCompetencia: {
        type: OportunidadeCompetenciaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return OportunidadeCompetencia.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = {
    OportunidadeCompetenciaResolve,
    OportunidadeCompetenciaType,
};