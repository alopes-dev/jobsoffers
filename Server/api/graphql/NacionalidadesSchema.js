const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Nacionalidade = require('../model/Nacionalidade')
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const NacionalidadeType = new GraphQLObjectType({
    name: 'NacionalidadeObject',
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

const NacionalidadeResolve = {
    Nacionalidades: {
        type: new GraphQLList(NacionalidadeType),
        resolve(parent, args) {
            return Nacionalidade.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Nacionalidade: {
        type: NacionalidadeType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Nacionalidade.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { NacionalidadeResolve, NacionalidadeType };