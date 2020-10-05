const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');

// Object-Model
const Candidato = require('../model/Candidato');
const Estado = require('../model/Estado');
const Pessoa = require('../model/Pessoa');
const Candidatura = require('../model/Candidatura');

//Object-Type
const { PessoaType } = require('./PessoasSchema');
const { EstadoType } = require('./EstadoSchema');
const { CandidaturaType } = require('./CandidaturasSchema');

const CandidatoType = new GraphQLObjectType({
    name: 'CandidatosObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        IsFavorito: { type: GraphQLString },
        Descricao: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
        PessoaId: { type: GraphQLString },
        Pessoa: {
            type: PessoaType,
            resolve(prev, args) {
                return Pessoa.findOne({
                        where: { Id: prev.PessoaId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
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

// Resolve
const CandidatoResolve = {
    Candidato: {
        type: new GraphQLList(CandidatoType),
        resolve(parent, args) {
            return Candidato.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    CandidatoPessoas: {
        type: new GraphQLList(CandidaturaType),
        args: { EmpresaId: { type: GraphQLString } },
        async resolve(parent, args) {
            const candidatura = await Candidatura.findAll();

            console.log(candidatura);
            return candidatura;
        },
    },
    Candidato: {
        type: CandidatoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Candidato.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { CandidatoResolve, CandidatoType };