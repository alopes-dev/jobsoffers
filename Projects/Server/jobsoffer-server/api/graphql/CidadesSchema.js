const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Cidade = require('../model/Cidade')
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const CidadeType = new GraphQLObjectType({
    name: 'CidadeObject',
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

const CidadeResolve = {
    Cidades: {
        type: new GraphQLList(CidadeType),
        resolve(parent, args) {
            return Cidade.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Cidade: {
        type: CidadeType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Cidade.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { CidadeResolve, CidadeType };