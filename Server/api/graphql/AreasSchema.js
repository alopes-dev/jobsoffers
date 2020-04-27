const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Area = require('../model/Area')
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const AreaType = new GraphQLObjectType({
    name: 'AreaObject',
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

const AreaResolve = {
    Areas: {
        type: new GraphQLList(AreaType),
        resolve(parent, args) {
            return Area.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Area: {
        type: AreaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Area.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { AreaResolve, AreaType };