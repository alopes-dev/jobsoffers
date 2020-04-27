const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');

const Candidatura = require('../model/Candidatura');
const Estado = require('../model/Estado');
const Candidato = require('../model/Candidato');
const Oportunidade = require('../model/Oportunidade');

const { CandidatoType } = require('./CandidatosSchema');
const { EstadoType } = require('./EstadoSchema');
const { OportunidadeType } = require('./oportunidade/type');

const CandidaturaType = new GraphQLObjectType({
    name: 'CandidaturaObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Status: { type: GraphQLInt },
        Descricao: { type: GraphQLString },
        CandidatoId: { type: GraphQLString },
        Candidato: {
            type: CandidatoType,
            resolve(prev, args) {
                return Candidato.findOne({
                        where: { Id: prev.CandidatoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeId: { type: GraphQLString },
        Oportunidade: {
            type: OportunidadeType,
            resolve(prev, args) {
                return Oportunidade.findOne({
                        where: { Id: prev.OportunidadeId },
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

const CandidaturaResolve = {
    Candidaturas: {
        type: new GraphQLList(CandidaturaType),
        resolve(parent, args) {
            return Candidatura.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Candidatura: {
        type: CandidaturaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Candidatura.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { CandidaturaResolve, CandidaturaType };