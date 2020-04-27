const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');
const uuid = require('uuid/v4')
const TipoFormacao = require('../model/TipoFormacao')
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const TipoFormacaoType = new GraphQLObjectType({
    name: 'TipoFormacaoObject',
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

const TipoFormacaoResolve = {
    TipoFormacaos: {
        type: new GraphQLList(TipoFormacaoType),
        resolve(parent, args) {
            return TipoFormacao.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    TipoFormacao: {
        type: TipoFormacaoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return TipoFormacao.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


const TipoFormacaoMutation = {
    addTipoFormacao: {
        type: TipoFormacaoType,
        args: {
            Designacao: { type: new GraphQLNonNull(GraphQLString) },
            EstadoId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
            const sysdate = new Date(Date.now())
            return TipoFormacao.create({
                Id: uuid(),
                Designacao: args.Designacao,
                EstadoId: args.EstadoId,
                CreatedAt: sysdate,
                UpdatedAt: sysdate,
            }).then(e => e).catch(err => err)
        }
    },
    // updateEstado: {
    //     type: EstadoType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) },
    //         Designacao: { type: new GraphQLNonNull(GraphQLString) }
    //     },
    //     resolve(parent, args) {
    //         return Estado.update({
    //             Designacao: args.Designacao,
    //             UpdatedAt: new Date().toJSON()
    //         }, { where: { Id: args.Id } }).then(e => args).catch(err => err)
    //     }
    // },
    // deleteEstado: {
    //     type: EstadoType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) }
    //     },
    //     resolve(parent, args) {
    //         return Estado.destroy({ where: { Id: args.Id } }).then(e => e).catch(err => err)
    //     }
    // }
}



module.exports = { TipoFormacaoResolve, TipoFormacaoType, TipoFormacaoMutation };