const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Beneficio = require('../model/Beneficio')
const Estado = require('../model/Estado');
const { EstadoType } = require('./EstadoSchema')

const BeneficioType = new GraphQLObjectType({
    name: 'BeneficioObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        IsFavorito: { type: GraphQLString },
        Descricao: { type: GraphQLString },
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

const BeneficioResolve = {
    Beneficios: {
        type: new GraphQLList(BeneficioType),
        resolve(parent, args) {
            return Beneficio.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Beneficio: {
        type: BeneficioType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return Beneficio.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { BeneficioResolve, BeneficioType };