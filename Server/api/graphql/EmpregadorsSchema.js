const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Empregador = require('../model/Empregador')
const Estado = require('../model/Estado');
const Pessoa = require('../model/Pessoa');

const { PessoaType } = require('./PessoasSchema');
const { EstadoType } = require('./EstadoSchema');

const EmpregadorType = new GraphQLObjectType({
    name: 'EmpregadorObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Status: { type: GraphQLInt },
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

const EmpregadorResolve = {
    Empregadors: {
        type: new GraphQLList(EmpregadorType),
        resolve(parent, args) {
            return Empregador.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Empregador: {
        type: EmpregadorType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return Empregador.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { EmpregadorResolve, EmpregadorType };