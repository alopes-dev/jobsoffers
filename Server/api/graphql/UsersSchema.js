const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Users = require('../model/Users')
const Estado = require('../model/Estado');

const UsersType = new GraphQLObjectType({
    name: 'UsersList',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
Designacao: { type: GraphQLString },

        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({
                    where: { Id: prev.EstadoId }
                }).then(e => e).catch(error => error)
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})