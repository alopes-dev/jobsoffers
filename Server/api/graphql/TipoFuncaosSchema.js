const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const TipoFuncao = require('../model/TipoFuncao');
const Estado = require('../model/Estado');
const Area = require('../model/Area');

const { AreaType } = require('./AreasSchema');
const { EstadoType } = require('./EstadoSchema');

const TipoFuncaoType = new GraphQLObjectType({
    name: 'TipoFuncaoObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Status: { type: GraphQLInt },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({
                        where: { Id: prev.EstadoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        AreaId: { type: GraphQLString },
        Area: {
            type: AreaType,
            resolve(prev, args) {
                return Area.findOne({
                        where: { Id: prev.AreaId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const TipoFuncaoResolve = {
    TipoFuncaoes: {
        type: new GraphQLList(TipoFuncaoType),
        resolve(parent, args) {
            return TipoFuncao.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    TipoFuncoes: {
        type: new GraphQLList(TipoFuncaoType),
        args: { Id: { type: GraphQLString }, Consts: { type: GraphQLString } },
        resolve(parent, args) {
            return TipoFuncao.findAll({
                    where: {
                        [args.Consts]: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
    TipoFuncao: {
        type: TipoFuncaoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return TipoFuncao.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { TipoFuncaoResolve, TipoFuncaoType };