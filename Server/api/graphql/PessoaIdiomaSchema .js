const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql');
const uuid = require('uuid/v4');
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

const PessoaidiomasInput = new GraphQLInputObjectType({
    name: 'PessoaidiomasInput',
    fields: () => ({
        Id: { type: GraphQLString },

        Percentagem: { type: GraphQLString },
        IdiomaId: { type: GraphQLString },
        PessoaId: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const PessoaIdiomasMutation = {
    addPessoaidiomas: {
        type: PessoaIdiomaType,
        args: {
            input: {
                type: PessoaidiomasInput,
            },
        },
        async resolve(_, { input: { PessoaId, IdiomaId, Percentagem } }) {
            const sequelize = require('../database/dbSetting');
            const t = await sequelize.transaction();

            try {
                const sysdate = new Date(Date.now());

                const idiomas = await PessoaIdioma.findAll({ where: { PessoaId } });

                idiomas.forEach((idioma) => {
                    if (idioma.IdiomaId === IdiomaId) {
                        throw new Error('Idioma já selecionado...');
                    }
                });

                const pessoaIdioma = await PessoaIdioma.create({
                    Id: uuid(),
                    Percentagem,
                    PessoaId,
                    IdiomaId,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                }, { transaction: t });

                await t.commit();
                return pessoaIdioma;
            } catch (error) {
                await t.rollback();
                throw new Error(error.message);
            }
        },
    },
    updatePessoaidiomas: {
        type: PessoaIdiomaType,
        args: {
            input: {
                type: PessoaidiomasInput,
            },
            Id: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, { Id, input: { IdiomaId } }) {
            // const pessoaIdioma = PessoaIdioma.findOne({ where: { Id: Id } });
            const sysdate = new Date(Date.now());
            // console.log(pessoaIdioma);
            // if (!pessoaIdioma)
            //     throw new error('idioma não existente para o seu usuario');

            const pessoaUpdate = await PessoaIdioma.update({
                IdiomaId,
                UpdatedAt: sysdate,
            }, { where: { Id: Id } });

            console.log(pessoaUpdate);
            return pessoaUpdate;
        },
    },
};

module.exports = {
    PessoaIdiomaResolve,
    PessoaIdiomaType,
    PessoaIdiomasMutation,
};