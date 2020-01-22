const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const TipoDocumento = require('../model/TipoDocumento')
const Estado = require('../model/Estado');
const { EstadoType } = require('./EstadoSchema');

const TipoDocumentoType = new GraphQLObjectType({
    name: 'TipoDocumentoObject',
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

const TipoDocumentoResolve = {
    TipoDocumentos: {
        type: new GraphQLList(TipoDocumentoType),
        resolve(parent, args) {
            return TipoDocumento.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    TipoDocumento: {
        type: TipoDocumentoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return TipoDocumento.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { TipoDocumentoResolve, TipoDocumentoType };