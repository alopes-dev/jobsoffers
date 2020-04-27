const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Resolve Imported
const { HobesResolve } = require('./HobesSchema');
const { CargoResolve } = require('./CargosSchema');
const { CidadeResolve } = require('./CidadesSchema');
const { DetalheResolve } = require('./DetalhesSchema');
const { EmpresaResolve } = require('./EmpresasSchema');
const { ContactoResolve } = require('./ContactosSchema');
const { CandidatoResolve } = require('./CandidatosSchema');
const { BeneficioResolve } = require('./BeneficiosSchema');
const { DocumentoResolve } = require('./DocumentosSchema');
const { CurriculoResolve } = require('./CurriculosSchema');
const { EmpregadorResolve } = require('./EmpregadorsSchema');
const { PessoaContactoResolve } = require('./PessoaContactoSchema');
const { PessoaResolve, PessoaMutation } = require('./PessoasSchema');
const { PessoaDocumentoResolve } = require('./PessoaDocumentoSchema');
const {
    TipoEmpregoResolve,
    TipoEmpregoMutation,
} = require('./TipoEmpregoSchema');
const { CandidaturaResolve } = require('./CandidaturasSchema');
const { TipoDetalheResolve } = require('./TipoDetalhesSchema');
const {
    TipoFormacaoResolve,
    TipoFormacaoMutation,
} = require('./TipoFormacaoSchema');
const { ContaUsuarioResolve } = require('./ContaUsuariosSchema');
const { TipoDocumentoResolve } = require('./TipoDocumentosSchema');
const { CurriculoHobesResolve } = require('./CurriculoHobesSchema');
const { EstadoResolve, EstadoMutation } = require('./EstadoSchema');
const { CurriculoDetalheResolve } = require('./CurriculoDetalhesSchema');
const { SectorDeAtividadeResolve } = require('./SectorDeAtividadesSchema');
const { CompetenciaResolve } = require('./CompetenciasSchema');
const {
    OportunidadeCompetenciaResolve,
} = require('./OportunidadeCompetenciaSchema');
const { TipoFuncaoResolve } = require('./TipoFuncaosSchema');
const { ProvinciaResolve } = require('./ProvinciasSchema');
const { NacionalidadeResolve } = require('./NacionalidadesSchema');
const { IdiomaResolve } = require('./IdiomasSchema');
const { AreaResolve } = require('./AreasSchema');
const { OportunidadeIIdiomaResolve } = require('./OportunidadeIIdiomaSchema');
const {
    AvaliacaoCurriculoResolve,
    AvaliacaoCurriculoMutation,
} = require('./AvaliacaoCurriculosSchema');
const {
    OportunidadeResolve,
    OportunidadeMutation,
} = require('./oportunidade/joined');

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...CargoResolve,
        ...HobesResolve,
        ...CidadeResolve,
        ...AreaResolve,
        ...EstadoResolve,
        ...PessoaResolve,
        ...IdiomaResolve,
        ...DetalheResolve,
        ...EmpresaResolve,
        ...ContactoResolve,
        ...ProvinciaResolve,
        ...BeneficioResolve,
        ...DocumentoResolve,
        ...CandidatoResolve,
        ...CurriculoResolve,
        ...TipoFuncaoResolve,
        ...EmpregadorResolve,
        ...CandidaturaResolve,
        ...TipoEmpregoResolve,
        ...CompetenciaResolve,
        ...TipoDetalheResolve,
        ...OportunidadeResolve,
        ...ContaUsuarioResolve,
        ...TipoFormacaoResolve,
        ...TipoDocumentoResolve,
        ...NacionalidadeResolve,
        ...PessoaContactoResolve,
        ...CurriculoHobesResolve,
        ...PessoaDocumentoResolve,
        ...CurriculoDetalheResolve,
        ...SectorDeAtividadeResolve,
        ...AvaliacaoCurriculoResolve,
        ...OportunidadeIIdiomaResolve,
        ...OportunidadeCompetenciaResolve,
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutaion',
    fields: {
        ...EstadoMutation,
        ...PessoaMutation,
        ...OportunidadeMutation,
        // ...AvaliacaoCurriculoMutation,
        // ...TipoEmpregoMutation,
        // ...TipoFormacaoMutation,
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});