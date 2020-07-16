const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const CurriculoHobes = require('../model/CurriculoHobes');
const Estado = require('../model/Estado');
const Hobes = require('../model/Hobes');

const { HobesType } = require('./HobesSchema');
const { EstadoType } = require('./EstadoSchema');

const CurriculoHobesType = new GraphQLObjectType({
    name: 'CurriculoHobesObject',
    fields: () => ({
        Id: { type: GraphQLString },
        CurriculoId: { type: GraphQLString },
        HobesId: { type: GraphQLString },

        EstadoId: { type: GraphQLString },
        Hobes: {
            type: HobesType,
            resolve(prev, args) {
                return Hobes.findOne({ where: { Id: prev.HobesId } })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({ where: { Id: prev.EstadoId } })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const CurriculoHobesResolve = {
    CurriculoHobes: {
        type: new GraphQLList(CurriculoHobesType),
        resolve(parent, args) {
            return CurriculoHobes.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    CurriculoHobe: {
        type: CurriculoHobesType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return CurriculoHobes.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { CurriculoHobesResolve, CurriculoHobesType };