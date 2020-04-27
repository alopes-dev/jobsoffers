const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Competencia = require('../model/Competencia')
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const CompetenciaType = new GraphQLObjectType({
    name: 'CompetenciaObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Status: { type: GraphQLInt },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({
                    where: { Id: prev.EstadoId }
                }).then(e => e).catch(error => error)
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const CompetenciaResolve = {
    Competencias: {
        type: new GraphQLList(CompetenciaType),
        resolve(parent, args) {
            return Competencia.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Competencia: {
        type: CompetenciaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Competencia.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { CompetenciaResolve, CompetenciaType };