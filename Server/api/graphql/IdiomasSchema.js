const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = require('graphql');
const Idioma = require('../model/Idioma');
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const IdiomaType = new GraphQLObjectType({
    name: 'IdiomaList',
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
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const IdiomaResolve = {
    Idiomas: {
        type: new GraphQLList(IdiomaType),
        resolve(parent, args) {
            return Idioma.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Idioma: {
        type: IdiomaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Idioma.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { IdiomaResolve, IdiomaType };