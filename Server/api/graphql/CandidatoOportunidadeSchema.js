const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const Estado = require('../model/Estado');
const Pessoa = require('../model/Pessoa');

const { EstadoType } = require('./EstadoSchema');
const { PessoaType } = require('./PessoasSchema');

const CandidaturaOportunidadeType = new GraphQLObjectType({
    name: 'CandidaturaOportunidadeObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Status: { type: GraphQLInt },
        IsAnalizado: { type: GraphQLInt },
        Descricao: { type: GraphQLString },
        CandidatoId: { type: GraphQLString },
        Candidato: {
            type: PessoaType,
            resolve(prev, _) {
                return Pessoa.findOne({
                        where: { Id: prev.CandidatoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeId: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, _) {
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

module.exports = { CandidaturaOportunidadeType };