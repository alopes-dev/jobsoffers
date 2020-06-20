const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType,
} = require('graphql');

const uuid = require('uuid/v4');

const Detalhe = require('../model/Detalhe');
const CurriculoDetalhe = require('../model/CurriculoDetalhe');
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

const DetalheInput = new GraphQLInputObjectType({
    name: 'DetalheInput',
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
        CurriculoId: { type: GraphQLString },
        TipoDetalheId: { type: GraphQLString },
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

const DetalheMutation = {
    addDetalhe: {
        type: DetalheType,
        args: {
            input: {
                type: DetalheInput,
            },
        },
        async resolve(_, { input: { CurriculoId, ...rest } }) {
            const sequelize = require('../database/dbSetting');
            const t = await sequelize.transaction();

            try {
                const sysdate = new Date(Date.now());
                console.log(rest);
                const detalhe = await Detalhe.create({
                    Id: uuid(),
                    ...rest,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                if (!detalhe) throw new Error('Error');

                console.log(detalhe.dataValues);
                const { Id } = detalhe.dataValues;
                console.log(CurriculoId, Id);
                await CurriculoDetalhe.create({
                    Id: uuid(),
                    CurriculoId,
                    DetalheId: Id,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                await t.commit();
                return detalhe;
            } catch (error) {
                await t.rollback();
                throw new Error(error.message);
            }
        },
    },
};

module.exports = { DetalheResolve, DetalheType, DetalheMutation };