const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql');
const uuid = require('uuid/v4')
const Estado = require('../model/Estado')

const EstadoType = new GraphQLObjectType({
    name: "EstadoObject",
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const EstadoResolve = {
    Estados: {
        type: new GraphQLList(EstadoType),
        resolve(parent, args) {
            return Estado.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Estado: {
        type: EstadoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return Estado.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


const EstadoMutation = {
    addEstado: {
        type: EstadoType,
        args: {
            Designacao: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            const sysdate = new Date(Date.now())
            return Estado.create({
                Id: uuid(),
                Designacao: args.Designacao,
                CreatedAt: sysdate,
                UpdatedAt: sysdate,
            }).then(e => e).catch(err => err)
        }
    },
    updateEstado: {
        type: EstadoType,
        args: {
            Id: { type: new GraphQLNonNull(GraphQLString) },
            Designacao: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            return Estado.update({
                Designacao: args.Designacao,
                UpdatedAt: new Date().toJSON()
            }, { where: { Id: args.Id } }).then(e => args).catch(err => err)
        }
    },
    deleteEstado: {
        type: EstadoType,
        args: {
            Id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            return Estado.destroy({ where: { Id: args.Id } }).then(e => e).catch(err => err)
        }
    }
}

module.exports = { EstadoResolve, EstadoType, EstadoMutation };