const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql');

const uuid = require('uuid/v4');

const Estado = require('../model/Estado');
const Pessoa = require('../model/Pessoa');
const Candidatura = require('../model/Candidatura');
const Oportunidade = require('../model/Oportunidade');

const { EstadoType } = require('./EstadoSchema');
const { PessoaType } = require('./PessoasSchema');
const { OportunidadeType } = require('./oportunidade/type');

const CandidaturaType = new GraphQLObjectType({
    name: 'CandidaturaObject',
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
        Oportunidade: {
            type: OportunidadeType,
            resolve(prev, _) {
                return Oportunidade.findOne({
                        where: { Id: prev.OportunidadeId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
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

const CandidaturaInput = new GraphQLInputObjectType({
    name: 'CandidaturaInput',
    fields: () => ({
        Id: { type: GraphQLString },
        Status: { type: GraphQLInt },
        IsAnalizado: { type: GraphQLInt },
        Descricao: { type: GraphQLString },
        CandidatoId: { type: GraphQLString },
        OportunidadeId: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const CandidaturaResolve = {
    Candidaturas: {
        type: new GraphQLList(CandidaturaType),
        resolve(__, _) {
            return Candidatura.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Candidatura: {
        type: CandidaturaType,
        args: { Id: { type: GraphQLString } },
        resolve(_, args) {
            return Candidatura.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const CandidaturaMutation = {
    addCandidatura: {
        type: CandidaturaType,
        args: {
            input: {
                type: CandidaturaInput,
            },
        },
        async resolve(_, { input }) {
            const sysdate = new Date(Date.now());

            const existPessoa = await Pessoa.findByPk(input.CandidatoId);

            if (!existPessoa) throw Error('Candidato não existe, verifique...');

            const { IsCandidato } = existPessoa.dataValues;

            if (IsCandidato !== 1)
                throw Error('Só Candidato pode se candidatar, verifique...');

            const existOportunidade = await Candidatura.findOne({
                where: { OportunidadeId: input.OportunidadeId },
            });

            if (existOportunidade) {
                const { CandidatoId } = existOportunidade.dataValues;

                if (CandidatoId === input.CandidatoId)
                    throw Error(
                        'Não é permitido se candidatar mais de uma vez numa vaga...'
                    );
            }

            return await Candidatura.create({
                Id: uuid(),
                ...input,
                CreatedAt: sysdate,
                UpdatedAt: sysdate,
            });
        },
    },

    // updateEstado: {
    //     type: EstadoType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) },
    //         Designacao: { type: new GraphQLNonNull(GraphQLString) },
    //     },
    //     resolve(parent, args) {
    //         return Estado.update({
    //                 Designacao: args.Designacao,
    //                 UpdatedAt: new Date().toJSON(),
    //             }, { where: { Id: args.Id } })
    //             .then((e) => args)
    //             .catch((err) => err);
    //     },
    // },
    // deleteEstado: {
    //     type: EstadoType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) },
    //     },
    //     resolve(parent, args) {
    //         return Estado.destroy({ where: { Id: args.Id } })
    //             .then((e) => e)
    //             .catch((err) => err);
    //     },
    // },
};

module.exports = { CandidaturaResolve, CandidaturaType, CandidaturaMutation };