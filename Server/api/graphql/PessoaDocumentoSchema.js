const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

const Estado = require('../model/Estado');
const Documento = require('../model/Documento');
const PessoaDocumento = require('../model/PessoaDocumento');

const { EstadoType } = require('./EstadoSchema');
const { DocumentoType } = require('./DocumentosSchema');

const PessoaDocumentoType = new GraphQLObjectType({
    name: 'PessoaDocumentosList',
    fields: () => ({
        Id: { type: GraphQLString },
        DocumentoId: { type: GraphQLString },
        Documento: {
            type: DocumentoType,
            resolve(prev, args) {
                return Documento.findOne({
                        where: { Id: prev.DocumentoId },
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

const PessoaDocumentoResolve = {
    PessoaDocumentos: {
        type: new GraphQLList(PessoaDocumentoType),
        resolve(parent, args) {
            return PessoaDocumento.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    PessoaDocumento: {
        type: PessoaDocumentoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return PessoaDocumento.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { PessoaDocumentoResolve, PessoaDocumentoType };