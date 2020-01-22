const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const TipoDetalhe = require('../model/TipoDetalhe')
const Estado = require('../model/Estado');
const { EstadoType } = require('./EstadoSchema');

const TipoDetalheType = new GraphQLObjectType({
    name: 'TipoDetalheObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Descricao: { type: GraphQLString },
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

const TipoDetalheResolve = {
    TipoDetalhes: {
        type: new GraphQLList(TipoDetalheType),
        resolve(parent, args) {
            return TipoDetalhe.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    TipoDetalhe: {
        type: TipoDetalheType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return TipoDetalhe.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { TipoDetalheResolve, TipoDetalheType };