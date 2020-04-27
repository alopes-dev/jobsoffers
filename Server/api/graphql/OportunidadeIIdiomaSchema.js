const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const OportunidadeIdioma = require('../model/OportunidadeIdioma');
const Estado = require('../model/Estado');
const Idioma = require('../model/Idioma');

const { EstadoType } = require('./EstadoSchema');
const { IdiomaType } = require('./IdiomasSchema');
const OportunidadeIIdiomaType = new GraphQLObjectType({
    name: 'OportunidadeIIdiomasList',
    fields: () => ({
        Id: { type: GraphQLString },
        IdiomaId: { type: GraphQLString },
        Idioma: {
            type: IdiomaType,
            resolve(prev, args) {
                return Idioma.findOne({
                        where: { Id: prev.IdiomaId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeId: { type: GraphQLString },
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

const OportunidadeIIdiomaResolve = {
    OportunidadeIIdiomas: {
        type: new GraphQLList(OportunidadeIIdiomaType),
        resolve(parent, args) {
            return OportunidadeIdioma.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    OportunidadeIdioma: {
        type: OportunidadeIIdiomaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return OportunidadeIdioma.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = {
    OportunidadeIIdiomaResolve,
    OportunidadeIIdiomaType,
};