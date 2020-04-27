const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} = require('graphql');
const OportunidadeBeneficio = require('../model/OportunidadeBeneficio');
const Estado = require('../model/Estado');
const Oportunidade = require('../model/Oportunidade');
const Beneficio = require('../model/Beneficio');

// const { OportunidadeType } = require('./oportunidade/type');
const { BeneficioType } = require('./BeneficiosSchema');
const { EstadoType } = require('./EstadoSchema');

const OportunidadeBeneficioType = new GraphQLObjectType({
    name: 'OportunidadeBeneficiosList',
    fields: () => ({
        Id: { type: GraphQLString },
        BeneficioId: { type: GraphQLString },
        Beneficio: {
            type: BeneficioType,
            resolve(prev, args) {
                return Beneficio.findOne({
                        where: { Id: prev.BeneficioId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeId: { type: GraphQLString },

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

const OportunidadeBeneficioResolve = {
    OportunidadeBeneficios: {
        type: new GraphQLList(OportunidadeBeneficioType),
        resolve(parent, args) {
            return OportunidadeBeneficio.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    OportunidadeBeneficio: {
        type: OportunidadeBeneficioType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return OportunidadeBeneficio.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { OportunidadeBeneficioResolve, OportunidadeBeneficioType };