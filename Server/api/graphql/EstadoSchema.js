const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLList,
} = require('graphql');
const uuid = require('uuid/v4');
const Estado = require('../model/Estado');

const EstadoType = new GraphQLObjectType({
    name: 'EstadoList',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const EstadoInput = new GraphQLInputObjectType({
    name: 'EstadoInput',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const EstadoPayLoad = new GraphQLObjectType({
    name: 'EstadoPayLoad',
    fields: () => ({
        addEstado: {
            type: new GraphQLList(EstadoType),
        },
    }),
});

const EstadoResolve = {
    allEstados: {
        type: new GraphQLList(EstadoType),
        resolve(parent, args) {
            return Estado.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Estado: {
        type: EstadoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Estado.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const EstadoMutation = {
    estadoInput: {
        type: EstadoPayLoad,
        args: {
            input: {
                type: EstadoInput,
            },
        },
        async resolve(parent, { input }) {
            const sysdate = new Date(Date.now());
            const data = await Estado.create({
                    Id: uuid(),
                    ...input,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                })
                .then((e) => e)
                .catch((err) => err);
            return data;
        },
    },

    updateEstado: {
        type: EstadoType,
        args: {
            Id: { type: new GraphQLNonNull(GraphQLString) },
            Designacao: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
            return Estado.update({
                    Designacao: args.Designacao,
                    UpdatedAt: new Date().toJSON(),
                }, { where: { Id: args.Id } })
                .then((e) => args)
                .catch((err) => err);
        },
    },
    deleteEstado: {
        type: EstadoType,
        args: {
            Id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
            return Estado.destroy({ where: { Id: args.Id } })
                .then((e) => e)
                .catch((err) => err);
        },
    },
};

module.exports = {
    EstadoResolve,
    EstadoType,
    EstadoMutation,
};