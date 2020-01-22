const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');

const Cargo = require('../model/Cargo');
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema')

const CargoType = new GraphQLObjectType({
    name: 'CargoObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        IsFavorito: { type: GraphQLInt },
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

const CargoResolve = {
    Cargos: {
        type: new GraphQLList(CargoType),
        resolve(parent, args) {
            return Cargo.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Cargo: {
        type: CargoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Cargo.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { CargoResolve, CargoType };