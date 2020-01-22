const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const ContaUsuario = require('../model/ContaUsuario')
const Estado = require('../model/Estado');
const Pessoa = require('../model/Pessoa');

const { EstadoType } = require('./EstadoSchema')
const { PessoaType } = require('./PessoasSchema')

const ContaUsuarioType = new GraphQLObjectType({
    name: 'ContaUsuarioObject',
    fields: () => ({
        Id: { type: GraphQLString },
        UserName: { type: GraphQLString },
        PassWord: { type: GraphQLString },
        Email: { type: GraphQLString },
        EmailAlternativo: { type: GraphQLString },

        PessoaId: { type: GraphQLString },
        Pessoa: {
            type: PessoaType,
            resolve(prev, args) {
                return Pessoa.findOne({
                    where: { Id: prev.PessoaId }
                }).then(e => e).catch(error => error)
            }
        },

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

const ContaUsuarioResolve = {
    ContaUsuarios: {
        type: new GraphQLList(ContaUsuarioType),
        resolve(parent, args) {
            return ContaUsuario.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    ContaUsuario: {
        type: ContaUsuarioType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return ContaUsuario.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { ContaUsuarioResolve, ContaUsuarioType };