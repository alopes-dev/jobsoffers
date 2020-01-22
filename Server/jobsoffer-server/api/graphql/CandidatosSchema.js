const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');

// Object-Model
const Candidato = require('../model/Candidato')
const Estado = require('../model/Estado');
const Pessoa = require('../model/Pessoa');

//Object-Type
const { PessoaType } = require('./PessoasSchema');
const { EstadoType } = require('./EstadoSchema');


const CandidatoType = new GraphQLObjectType({
    name: 'CandidatosObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        IsFavorito: { type: GraphQLString },
        Descricao: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
        PessoaId: { type: GraphQLString },
        Pessoa: {
            type: PessoaType,
            resolve(prev, args) {
                return Pessoa.findOne({
                    where: { Id: prev.PessoaId }
                }).then(e => e).catch(error => error)
            }
        },
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

// Resolve
const CandidatoResolve = {
    Candidato: {
        type: new GraphQLList(CandidatoType),
        resolve(parent, args) {
            return Candidatos.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Candidato: {
        type: CandidatoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return Candidato.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { CandidatoResolve, CandidatoType };