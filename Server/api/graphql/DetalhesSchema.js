const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const Detalhe = require('../model/Detalhe');
const Estado = require('../model/Estado');
const TipoDetalhe = require('../model/TipoDetalhe');
const { EstadoType } = require('./EstadoSchema');
const { TipoDetalheType } = require('./TipoDetalhesSchema');

const DetalheType = new GraphQLObjectType({
    name: 'DetalheObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        NomeDaInstituicao: { type: GraphQLString },
        DescricaoDaInstituicao: { type: GraphQLString },
        LocalDaInstituicao: { type: GraphQLString },
        DataInicio: { type: GraphQLString },
        DataFim: { type: GraphQLString },
        Status: { type: GraphQLString },
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
        TipoDetalheId: { type: GraphQLString },
        TipoDetalhe: {
            type: TipoDetalheType,
            resolve(prev, args) {
                return TipoDetalhe.findOne({
                        where: { Id: prev.TipoDetalheId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const DetalheResolve = {
    Detalhes: {
        type: new GraphQLList(DetalheType),
        resolve(parent, args) {
            return Detalhe.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Detalhe: {
        type: DetalheType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Detalhe.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { DetalheResolve, DetalheType };