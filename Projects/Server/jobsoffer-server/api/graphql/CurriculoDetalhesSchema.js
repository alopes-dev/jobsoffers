const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const CurriculoDetalhe = require('../model/CurriculoDetalhe')
const Estado = require('../model/Estado');
const Curriculo = require('../model/Curriculo');
const Detalhe = require('../model/Detalhe');

const { CurriculoType } = require('./CurriculosSchema');
const { DetalheType } = require('./DetalhesSchema');
const { EstadoType } = require('./EstadoSchema');

const CurriculoDetalheType = new GraphQLObjectType({
    name: 'CurriculoDetalheObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Status: { type: GraphQLString },
        CurriculoId: { type: GraphQLString },
        Curriculo: {
            type: CurriculoType,
            resolve(prev, args) {
                return Curriculo.findOne({
                    where: { Id: prev.CurriculoId }
                }).then(e => e).catch(error => error)
            }
        },
        DetalheId: { type: GraphQLString },
        Detalhe: {
            type: DetalheType,
            resolve(prev, args) {
                return Detalhe.findOne({
                    where: { Id: prev.DetalheId }
                }).then(e => e).catch(error => error)
            }
        },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({ // 928762963
                    where: { Id: prev.EstadoId }
                }).then(e => e).catch(error => error)
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const CurriculoDetalheResolve = {
    CurriculoDetalhes: {
        type: new GraphQLList(CurriculoDetalheType),
        resolve(parent, args) {
            return CurriculoDetalhe.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    CurriculoDetalhe: {
        type: CurriculoDetalheType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return CurriculoDetalhe.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { CurriculoDetalheResolve, CurriculoDetalheType };