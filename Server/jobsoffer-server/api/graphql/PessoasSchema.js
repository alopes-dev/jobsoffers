const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Pessoa = require('../model/Pessoa')
const Estado = require('../model/Estado');
const Documento = require('../model/Documento');
const Contacto = require('../model/Contacto');
const Cidade = require('../model/Cidade');

const { EstadoType } = require('./EstadoSchema');
const { DocumentoType } = require('./DocumentosSchema');
const { ContactoType } = require('./ContactosSchema');
const { CidadeType } = require('./CidadesSchema');

const PessoaType = new GraphQLObjectType({
    name: 'PessoaObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Nome: { type: GraphQLString },
        SobreNome: { type: GraphQLString },
        DataNascimento: { type: GraphQLString },
        Localizacao: { type: GraphQLString },
        Foto: { type: GraphQLString },
        Status: { type: GraphQLInt },
        DocumentoId: { type: GraphQLString },
        Documento: {
            type: DocumentoType,
            resolve(prev, args) {
                return Documento.findOne({
                    where: { Id: prev.DocumentoId }
                }).then(e => e).catch(error => error)
            }
        },
        ContactoId: { type: GraphQLString },
        Contacto: {
            type: ContactoType,
            resolve(prev, args) {
                return Contacto.findOne({
                    where: { Id: prev.ContactoId }
                }).then(e => e).catch(error => error)
            }
        },
        CidadeId: { type: GraphQLString },
        Cidade: {
            type: CidadeType,
            resolve(prev, args) {
                return Cidade.findOne({
                    where: { Id: prev.CidadeId }
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

const PessoaResolve = {
    Pessoas: {
        type: new GraphQLList(PessoaType),
        resolve(parent, args) {
            return Pessoa.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Pessoa: {
        type: PessoaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return Pessoa.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { PessoaResolve, PessoaType };