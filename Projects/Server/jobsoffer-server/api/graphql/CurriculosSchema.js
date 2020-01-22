const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Curriculo = require('../model/Curriculo')
const Estado = require('../model/Estado');
const Candidato = require('../model/Candidato');

const { EstadoType } = require('./EstadoSchema');
const { CandidatoType } = require('./CandidatosSchema');

const CurriculoType = new GraphQLObjectType({
    name: 'CurriculoObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Status: { type: GraphQLString },
        CandidatoId: { type: GraphQLString },
        Candidato: {
            type: CandidatoType,
            resolve(prev, args) {
                return Candidato.findOne({
                    where: { Id: prev.CandidatoId }
                }).then(e => e).catch(error => error)
            }
        },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({
                    where: { Id: prev.EstadoId }
                }).then(e => e).catch(error => error)
            } //934857685
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const CurriculoResolve = {
    Curriculos: {
        type: new GraphQLList(CurriculoType),
        resolve(parent, args) {
            return Curriculo.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Curriculo: {
        type: CurriculoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Curriculo.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { CurriculoResolve, CurriculoType };