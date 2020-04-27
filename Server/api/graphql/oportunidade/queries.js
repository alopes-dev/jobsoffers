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
    oportunidade: {
        type: OportunidadeType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Oportunidade.findOne({
                    where: { Id: args.Id },
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