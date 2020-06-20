const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const uuid = require('uuid/v4');
const Competencia = require('../model/Competencia');
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const CompetenciaType = new GraphQLObjectType({
    name: 'CompetenciaObject',
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

const CompetenciaResolve = {
    Competencias: {
        type: new GraphQLList(CompetenciaType),
        resolve(parent, args) {
            return Competencia.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Competencia: {
        type: CompetenciaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Competencia.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const CompetenciaInput = new GraphQLInputObjectType({
    name: 'CompetenciaInput',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Descricao: { type: GraphQLString },
        Percentagem: { type: GraphQLString },
        CurriculoId: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const CompetenciaMutation = {
    addCompetencia: {
        type: CompetenciaType,
        args: {
            input: {
                type: CompetenciaInput,
            },
        },
        async resolve(_, { input: { CurriculoId, ...rest } }) {
            const sequelize = require('../database/dbSetting');
            const t = await sequelize.transaction();

            try {
                const sysdate = new Date(Date.now());

                const competencia = await Competencia.create({
                    Id: uuid(),
                    ...rest,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                await t.commit();
                return competencia;
            } catch (error) {
                await t.rollback();
                throw new Error(error.message);
            }
        },
    },
};

module.exports = { CompetenciaResolve, CompetenciaType, CompetenciaMutation };