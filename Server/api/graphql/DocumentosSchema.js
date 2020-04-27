const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLID,
} = require('graphql');
const Documento = require('../model/Documento');
const Estado = require('../model/Estado');

const { EstadoType } = require('./EstadoSchema');
const { TipoDocumentoType } = require('./TipoDocumentosSchema');

const DocumentoType = new GraphQLObjectType({
    name: 'DocumentoObject',
    fields: () => ({
        Id: { type: GraphQLString },
        NumDocumento: { type: GraphQLString },
        TipoDocumentoId: { type: GraphQLString },
        TipoDocumento: {
            type: TipoDocumentoType,
            resolve(prev, args) {
                return TipoDocumento.findOne({
                        where: { Id: prev.TipoDocumentoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
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

const DocumentoInput = new GraphQLInputObjectType({
    name: 'DocumentoInput',
    fields: () => ({
        Id: { type: GraphQLString },
        NumDocumento: { type: GraphQLString },
        TipoDocumentoId: { type: GraphQLString },
        EstadoId: { type: GraphQLString },
    }),
});

const DocumentoResolve = {
    Documentos: {
        type: new GraphQLList(DocumentoType),
        resolve(parent, args) {
            return Documento.findAll()
                .then((e) => e)
                .catch((error) => error);
        },
    },
    Documento: {
        type: DocumentoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args);
            return Documento.findOne({
                    where: { Id: args.Id },
                })
                .then((e) => e)
                .catch((error) => error);
        },
    },
};

module.exports = { DocumentoResolve, DocumentoType, DocumentoInput };