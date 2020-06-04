const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');

const uuid = require('uuid/v4');

const Estado = require('../model/Estado');
const Candidatura = require('../model/Candidatura');
const SolicitacaoDocumento = require('../model/SolicitacaoDocumentos');
const TipoDocumento = require('../model/TipoDocumento');

const { EstadoType } = require('./EstadoSchema');
const { CandidaturaType } = require('./CandidaturasSchema');
const { TipoDocumentoType } = require('./TipoDocumentosSchema');

const SolicitacaoDocumentoType = new GraphQLObjectType({
  name: 'SolicitacaoDocumentoObject',
  fields: () => ({
    Id: { type: GraphQLString },
    Status: { type: GraphQLInt },
    DetalheEspecifico: { type: GraphQLString },
    CandidaturaId: { type: GraphQLString },
    Candidatura: {
      type: CandidaturaType,
      resolve(prev, _) {
        return Candidatura.findOne({
          where: { Id: prev.CandidaturaId },
        })
          .then((e) => e)
          .catch((error) => error);
      },
    },
    TipoDocumentoId: { type: GraphQLString },
    TipoDocumento: {
      type: TipoDocumentoType,
      resolve(prev, _) {
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
      resolve(prev, _) {
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

const SolicitacaoDocumentoInput = new GraphQLInputObjectType({
  name: 'SolicitacaoDocumentoInput',
  fields: () => ({
    Id: { type: GraphQLString },
    Status: { type: GraphQLInt },
    DetalheEspecifico: { type: GraphQLString },
    CandidaturaId: { type: GraphQLString },
    TipoDocumentoId: { type: new GraphQLList(GraphQLString) },
    EstadoId: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const SolicitacaoDocumentoResolve = {
  SolicitacaoDocumentos: {
    type: new GraphQLList(SolicitacaoDocumentoType),
    async resolve(__, _) {
      return await SolicitacaoDocumento.findAll();
    },
  },
  SolicitacaoDocumento: {
    type: new GraphQLList(SolicitacaoDocumentoType),
    args: { Id: { type: GraphQLString }, Consts: { type: GraphQLString } },
    resolve(_, args) {
      return SolicitacaoDocumento.findAll({
        where: {
          [args.Consts]: args.Id,
        },
      })
        .then((e) => e)
        .catch((error) => error);
    },
  },
};

const SolicitacaoDocumentoMutation = {
  addSolicitacaoDocumento: {
    type: SolicitacaoDocumentoType,
    args: {
      input: {
        type: SolicitacaoDocumentoInput,
      },
    },
    async resolve(_, { input: { TipoDocumentoId, ...rest } }) {
      try {
        const sysdate = new Date(Date.now());

        return await TipoDocumentoId.map(async (item) => {
          return await SolicitacaoDocumento.create({
            Id: uuid(),
            ...rest,
            TipoDocumentoId: item,
            CreatedAt: sysdate,
            UpdatedAt: sysdate,
          });
        })[0];
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = {
  SolicitacaoDocumentoResolve,
  SolicitacaoDocumentoType,
  SolicitacaoDocumentoMutation,
};
