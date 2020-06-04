const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLID,
} = require('graphql');
const Contacto = require('../model/Contacto');
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');

const ContactoType = new GraphQLObjectType({
    name: 'ContactoObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Status: { type: GraphQLInt },
        Telefone: { type: GraphQLString },
        Email: { type: GraphQLString },
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

const ContactoInput = new GraphQLInputObjectType({
    name: 'ContactoInput',
    fields: () => ({
        Id: { type: GraphQLString },
        Status: { type: GraphQLInt },
        Telefone: { type: GraphQLString },
        TelefoneAlternativo: { type: GraphQLString },
        Email: { type: GraphQLString },
        EmailAlternativo: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
    }),
});

const ContactoResolve = {
    Contactos: {
        type: new GraphQLList(ContactoType),
        resolve(parent, args) {
            return Contacto.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Contacto: {
        type: ContactoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Contacto.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { ContactoResolve, ContactoType, ContactoInput };