const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const Estado = require('../model/Estado');
const Contacto = require('../model/Contacto');
const PessoaContacto = require('../model/PessoaContacto');

const { EstadoType } = require('./EstadoSchema');
const { ContactoType } = require('./ContactosSchema');

const PessoaContactoType = new GraphQLObjectType({
    name: 'PessoaContactosList',
    fields: () => ({
        Id: { type: GraphQLString },
        ContactoId: { type: GraphQLString },
        Contacto: {
            type: ContactoType,
            resolve(prev, args) {
                return Contacto.findOne({
                        where: { Id: prev.ContactoId },
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

const PessoaContactoResolve = {
    PessoaContactos: {
        type: new GraphQLList(PessoaContactoType),
        resolve(parent, args) {
            return PessoaContacto.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    PessoaContacto: {
        type: PessoaContactoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return PessoaContacto.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { PessoaContactoResolve, PessoaContactoType };