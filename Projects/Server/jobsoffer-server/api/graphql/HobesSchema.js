const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Hobes = require('../model/Hobes')
const Estado = require('../model/Estado');
const { EstadoType } = require('./EstadoSchema');

const HobesType = new GraphQLObjectType({
    name: 'HobesObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Percentagem: { type: GraphQLString },
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

const HobesResolve = {
    Hobes: {
        type: new GraphQLList(HobesType),
        resolve(parent, args) {
            return Hobes.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Hobe: {
        type: HobesType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return Hobes.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { HobesResolve, HobesType };