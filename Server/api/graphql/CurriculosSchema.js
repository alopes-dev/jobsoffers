const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const Curriculo = require('../model/Curriculo');
const Estado = require('../model/Estado');
const Pessoa = require('../model/Pessoa');
const CurriculoHobes = require('../model/CurriculoHobes');
const CurriculoSkills = require('../model/CurriculoSkills');
const CurriculoDetalhe = require('../model/CurriculoDetalhe');

const { EstadoType } = require('./EstadoSchema');
const { PessoaType } = require('./PessoasSchema');
const { CurriculoHobesType } = require('./CurriculoHobesSchema');
const { CurriculoSkillsType } = require('./CurriculoSkillsSchema');
const { CurriculoDetalheType } = require('./CurriculoDetalhesSchema');

const CurriculoType = new GraphQLObjectType({
    name: 'CurriculoObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Status: { type: GraphQLString },
        CandidatoId: { type: GraphQLString },
        ResumoProfissional: { type: GraphQLString },
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
        CurriculoSkills: {
            type: new GraphQLList(CurriculoSkillsType),
            resolve(prev, _) {
                return CurriculoSkills.findAll({
                        where: { CurriculoId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        CurriculoDetalhes: {
            type: new GraphQLList(CurriculoDetalheType),
            resolve(prev, _) {
                return CurriculoDetalhe.findAll({
                        where: { CurriculoId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        CurriculoHobes: {
            type: new GraphQLList(CurriculoHobesType),
            resolve(prev, _) {
                return CurriculoHobes.findAll({
                        where: { CurriculoId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const CurriculoResolve = {
    Curriculos: {
        type: new GraphQLList(CurriculoType),
        resolve(__, _) {
            return Curriculo.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Curriculo: {
        type: CurriculoType,
        args: { Id: { type: GraphQLString }, Consts: { type: GraphQLString } },
        resolve(__, args) {
            console.log(args);
            return Curriculo.findOne({
                    where: {
                        [args.Consts]: args.Id,
                    },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { CurriculoResolve, CurriculoType };