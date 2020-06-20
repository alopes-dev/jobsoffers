const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const CurriculoIdiomas = require('../model/CurriculoIdiomas');
const Estado = require('../model/Estado');
const Curriculo = require('../model/Curriculo');
const Idiomas = require('../model/Idiomas');

const { CurriculoType } = require('./CurriculosSchema');
const { IdiomasType } = require('./IdiomasSchema');
const { EstadoType } = require('./EstadoSchema');

const CurriculoIdiomasType = new GraphQLObjectType({
    name: 'CurriculoIdiomasObject',
    fields: () => ({
        Id: { type: GraphQLString },
        CurriculoId: { type: GraphQLString },

        EstadoId: { type: GraphQLString },
        Idiomas: {
            type: IdiomasType,
            resolve(prev, args) {
                return Idiomas.findOne({
                        where: { Id: prev.IdiomasId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
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

const CurriculoIdiomasResolve = {
    CurriculoIdiomas: {
        type: new GraphQLList(CurriculoIdiomasType),
        resolve(parent, args) {
            return CurriculoIdiomas.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    CurriculoHobe: {
        type: CurriculoIdiomasType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return CurriculoIdiomas.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { CurriculoIdiomasResolve, CurriculoIdiomasType };