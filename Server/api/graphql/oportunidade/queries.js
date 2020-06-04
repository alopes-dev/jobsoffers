const { GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql');

const Oportunidade = require('../../model/Oportunidade');

const { OportunidadeType } = require('./type');

const OportunidadeResolve = {
    allOportunidades: {
        type: new GraphQLList(OportunidadeType),
        resolve(parent, args) {
            return Oportunidade.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    OportunidadesByEmpresa: {
        type: new GraphQLList(OportunidadeType),
        args: { Id: { type: GraphQLString }, Consts: { type: GraphQLString } },
        resolve(parent, args) {
            return Oportunidade.findAll({
                    where: {
                        [args.Consts]: args.Id,
                    },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
    vagasDisponiveis: {
        type: new GraphQLList(OportunidadeType),

        async resolve(_, args) {
            return await Oportunidade.findAll({
                where: { IsFinalizado: 0 },
            });
        },
    },
    oportunidade: {
        type: OportunidadeType,
        args: { Id: { type: GraphQLString }, Consts: { type: GraphQLString } },
        resolve(parent, args) {
            return Oportunidade.findOne({
                    where: {
                        [args.Consts]: args.Id,
                    },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
    oportunidadeById: {
        type: OportunidadeType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Oportunidade.findOne({
                    where: {
                        Id: args.Id,
                    },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

const OportunidadePayload = new GraphQLObjectType({
    name: 'OportunidadePayload',
    fields: () => ({
        addOportunidade: {
            type: OportunidadeType,
        },
    }),
});

module.exports = { OportunidadeResolve, OportunidadePayload };