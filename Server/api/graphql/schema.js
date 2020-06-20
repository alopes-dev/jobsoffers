const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Resolve Imported
const { SettionMutation } = require('./Session');
const { SkillsResolve, SkillsMutation } = require('./SkillsSchema');
const { HobesResolve, HobesMutation } = require('./HobesSchema');
const { CargoResolve } = require('./CargosSchema');
const { CidadeResolve } = require('./CidadesSchema');
const { DetalheResolve, DetalheMutation } = require('./DetalhesSchema');
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
    SolicitacaoDocumentoResolve,
    SolicitacaoDocumentoMutation,
} = require('./SolicitacaoDocumentos');
const {
    TipoEmpregoResolve,
    TipoEmpregoMutation,
} = require('./TipoEmpregoSchema');
const {
    CandidaturaResolve,
    CandidaturaMutation,
} = require('./CandidaturasSchema');
const { TipoDetalheResolve } = require('./TipoDetalhesSchema');
const {
    TipoFormacaoResolve,
    TipoFormacaoMutation,
} = require('./TipoFormacaoSchema');
const { ContaUsuarioResolve } = require('./ContaUsuariosSchema');
const { TipoDocumentoResolve } = require('./TipoDocumentosSchema');
const { CurriculoHobesResolve } = require('./CurriculoHobesSchema');
const { CurriculoSkillsResolve } = require('./CurriculoSkillsSchema');
const { EstadoResolve, EstadoMutation } = require('./EstadoSchema');
const { CurriculoDetalheResolve } = require('./CurriculoDetalhesSchema');
const { SectorDeAtividadeResolve } = require('./SectorDeAtividadesSchema');
const {
    CompetenciaResolve,
    CompetenciaMutation,
} = require('./CompetenciasSchema');
const {
    OportunidadeCompetenciaResolve,
} = require('./OportunidadeCompetenciaSchema');
const { TipoFuncaoResolve } = require('./TipoFuncaosSchema');
const { ProvinciaResolve } = require('./ProvinciasSchema');
const { NacionalidadeResolve } = require('./NacionalidadesSchema');
const { IdiomaResolve, IdiomaMutation } = require('./IdiomasSchema');
const { AreaResolve } = require('./AreasSchema');
const { OportunidadeIIdiomaResolve } = require('./OportunidadeIIdiomaSchema');
const {
    PessoaIdiomaResolve,
    PessoaIdiomasMutation,
} = require('./PessoaIdiomaSchema ');
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
        ...SkillsResolve,
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
        ...PessoaIdiomaResolve,
        ...TipoFormacaoResolve,
        ...TipoDocumentoResolve,
        ...NacionalidadeResolve,
        ...PessoaContactoResolve,
        ...CurriculoHobesResolve,
        ...CurriculoSkillsResolve,
        ...PessoaDocumentoResolve,
        ...CurriculoDetalheResolve,
        ...SectorDeAtividadeResolve,
        ...AvaliacaoCurriculoResolve,
        ...OportunidadeIIdiomaResolve,
        ...SolicitacaoDocumentoResolve,
        ...OportunidadeCompetenciaResolve,
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutaion',
    fields: {
        ...HobesMutation,
        ...IdiomaMutation,
        ...SkillsMutation,
        ...EstadoMutation,
        ...PessoaMutation,
        ...SettionMutation,
        ...DetalheMutation,
        ...CompetenciaMutation,
        ...CandidaturaMutation,
        ...OportunidadeMutation,
        ...PessoaIdiomasMutation,
        ...SolicitacaoDocumentoMutation,
        // ...AvaliacaoCurriculoMutation,
        // ...TipoEmpregoMutation,
        // ...TipoFormacaoMutation,
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});