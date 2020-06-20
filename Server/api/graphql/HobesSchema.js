const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql');
const uuid = require('uuid/v4');
const Hobes = require('../model/Hobes');
const CurriculoHobes = require('../model/CurriculoHobes');
const Estado = require('../model/Estado');
const { EstadoType } = require('./EstadoSchema');

const HobesType = new GraphQLObjectType({
    name: 'HobesObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Percentagem: { type: GraphQLString },
        Descricao: { type: GraphQLString },
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

const HobesResolve = {
    Hobes: {
        type: new GraphQLList(HobesType),
        resolve(parent, args) {
            return Hobes.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Hobe: {
        type: HobesType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Hobes.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const HobesInput = new GraphQLInputObjectType({
    name: 'HobesInput',
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

const HobesMutation = {
    addHobes: {
        type: HobesType,
        args: {
            input: {
                type: HobesInput,
            },
        },
        async resolve(_, { input: { CurriculoId, ...rest } }) {
            const sequelize = require('../database/dbSetting');
            const t = await sequelize.transaction();

            try {
                const sysdate = new Date(Date.now());

                const hobes = await Hobes.create({
                    Id: uuid(),
                    ...rest,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                if (!hobes) throw new Error('Error');

                console.log(hobes.dataValues);
                const { Id } = hobes.dataValues;
                console.log(CurriculoId, Id);
                await CurriculoHobes.create({
                    Id: uuid(),
                    CurriculoId,
                    HobesId: Id,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                await t.commit();
                return Hobes;
            } catch (error) {
                await t.rollback();
                throw new Error(error.message);
            }
        },
    },
};

module.exports = { HobesResolve, HobesType, HobesMutation };