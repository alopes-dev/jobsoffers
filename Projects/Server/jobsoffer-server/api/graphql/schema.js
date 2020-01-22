const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

// Resolve Imported
const { HobesResolve } = require('./HobesSchema')
const { CargoResolve } = require('./CargosSchema')
const { EstadoResolve, EstadoMutation } = require('./EstadoSchema')
const { CidadeResolve } = require('./CidadesSchema')
const { PessoaResolve } = require('./PessoasSchema')
const { DetalheResolve } = require('./DetalhesSchema')
const { EmpresaResolve } = require('./EmpresasSchema')
const { ContactoResolve } = require('./ContactosSchema')
const { CandidatoResolve } = require('./CandidatosSchema')
const { BeneficioResolve } = require('./BeneficiosSchema')
const { DocumentoResolve } = require('./DocumentosSchema')
const { CurriculoResolve } = require('./CurriculosSchema')
const { EmpregadorResolve } = require('./EmpregadorsSchema')
const { CandidaturaResolve } = require('./CandidaturasSchema')
const { TipoDetalheResolve } = require('./TipoDetalhesSchema')
const { TipoDocumentoResolve } = require('./TipoDocumentosSchema')
const { ContaUsuarioResolve } = require('./ContaUsuariosSchema')
const { OportunidadeResolve } = require('./OportunidadesSchema')
const { CurriculoHobesResolve } = require('./CurriculoHobesSchema')
const { CurriculoDetalheResolve } = require('./CurriculoDetalhesSchema')
const { SectorDeAtividadeResolve } = require('./SectorDeAtividadesSchema')
const { AvaliacaoCurriculoResolve, AvaliacaoCurriculoMutation } = require('./AvaliacaoCurriculosSchema');

const RootQuery = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
        ...CargoResolve,
        ...HobesResolve,
        ...CidadeResolve,
        ...EstadoResolve,
        ...PessoaResolve,
        ...DetalheResolve,
        ...EmpresaResolve,
        ...ContactoResolve,
        ...BeneficioResolve,
        ...DocumentoResolve,
        ...CandidatoResolve,
        ...CurriculoResolve,
        ...EmpregadorResolve,
        ...CandidaturaResolve,
        ...TipoDetalheResolve,
        ...OportunidadeResolve,
        ...ContaUsuarioResolve,
        ...TipoDocumentoResolve,
        ...CurriculoHobesResolve,
        ...CurriculoDetalheResolve,
        ...SectorDeAtividadeResolve,
        ...AvaliacaoCurriculoResolve,
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'MutaionType',
    fields: {
        ...EstadoMutation,
        ...AvaliacaoCurriculoMutation
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})