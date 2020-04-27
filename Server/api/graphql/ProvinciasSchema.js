const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Provincia = require('../model/Provincia')
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const ProvinciaType = new GraphQLObjectType({
    name: 'ProvinciaObject',
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

const ProvinciaResolve = {
    Provincias: {
        type: new GraphQLList(ProvinciaType),
        resolve(parent, args) {
            return Provincia.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Provincia: {
        type: ProvinciaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Provincia.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { ProvinciaResolve, ProvinciaType };