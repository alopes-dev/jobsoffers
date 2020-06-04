const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const PessoaIdioma = require('../model/PessoaIdioma');
const Estado = require('../model/Estado');
const Idioma = require('../model/Idioma');

const { EstadoType } = require('./EstadoSchema');
const { IdiomaType } = require('./IdiomasSchema');
const PessoaIdiomaType = new GraphQLObjectType({
    name: 'PessoaIdiomasList',
    fields: () => ({
        Id: { type: GraphQLString },
        Percentagem: { type: GraphQLString },
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
        PessoaId: { type: GraphQLString },
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

const PessoaIdiomaResolve = {
    PessoaIdiomas: {
        type: new GraphQLList(PessoaIdiomaType),
        resolve(parent, args) {
            return PessoaIdioma.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    PessoaIdioma: {
        type: PessoaIdiomaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return PessoaIdioma.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = {
    PessoaIdiomaResolve,
    PessoaIdiomaType,
};