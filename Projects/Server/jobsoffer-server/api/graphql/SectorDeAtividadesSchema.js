const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const SectorDeAtividade = require('../model/SectorDeAtividade')
const Estado = require('../model/Estado');
const { EstadoType } = require('./EstadoSchema');

const SectorDeAtividadeType = new GraphQLObjectType({
    name: 'SectorDeAtividadeObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Status: { type: GraphQLString },
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

const SectorDeAtividadeResolve = {
    SectorDeAtividades: {
        type: new GraphQLList(SectorDeAtividadeType),
        resolve(parent, args) {
            return SectorDeAtividade.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    SectorDeAtividade: {
        type: SectorDeAtividadeType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return SectorDeAtividade.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { SectorDeAtividadeResolve, SectorDeAtividadeType };