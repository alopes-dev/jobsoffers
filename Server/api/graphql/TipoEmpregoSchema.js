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
const TipoEmprego = require('../model/TipoEmprego')
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const TipoEmpregoType = new GraphQLObjectType({
    name: 'TipoEmpregoObject',
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

const TipoEmpregoResolve = {
    TipoEmpregos: {
        type: new GraphQLList(TipoEmpregoType),
        resolve(parent, args) {
            return TipoEmprego.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    TipoEmprego: {
        type: TipoEmpregoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return TipoEmprego.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}




const TipoEmpregoMutation = {
    addTipoEmprego: {
        type: TipoEmpregoType,
        args: {
            Designacao: { type: new GraphQLNonNull(GraphQLString) },
            EstadoId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
            const sysdate = new Date(Date.now())
            return TipoEmprego.create({
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



module.exports = { TipoEmpregoResolve, TipoEmpregoType, TipoEmpregoMutation };