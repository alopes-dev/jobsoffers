const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = require('graphql');
const Estado = require('../../model/Estado');
const TipoFuncao = require('../../model/TipoFuncao');
const TipoEmprego = require('../../model/TipoEmprego');
const TipoFormacao = require('../../model/TipoFormacao');
const OportunidadeIdioma = require('../../model/OportunidadeIdioma');
const Cargo = require('../../model/Cargo');
const Beneficio = require('../../model/Beneficio');
const OportunidadeCompetencia = require('../../model/OportunidadeCompetencia');
const OportunidadeBeneficio = require('../../model/OportunidadeBeneficio');
const Provincia = require('../../model/Provincia');
const Nacionalidade = require('../../model/Nacionalidade');
const Candidatura = require('../../model/Candidatura');
const Empresa = require('../../model/Empresa');

const { TipoEmpregoType } = require('../TipoEmpregoSchema');
const { TipoFormacaoType } = require('../TipoFormacaoSchema');
const { CargoType } = require('../CargosSchema');
const { BeneficioType } = require('../BeneficiosSchema');
const {
    OportunidadeCompetenciaType,
} = require('../OportunidadeCompetenciaSchema');
const { TipoFuncaoType } = require('../TipoFuncaosSchema');
const { ProvinciaType } = require('../ProvinciasSchema');
const { NacionalidadeType } = require('../NacionalidadesSchema');
const { EstadoType } = require('../EstadoSchema');
const { EmpresaType } = require('../EmpresasSchema');
const {
    CandidaturaOportunidadeType,
} = require('../CandidatoOportunidadeSchema');
const { OportunidadeIIdiomaType } = require('../OportunidadeIIdiomaSchema');
const { OportunidadeBeneficioType } = require('../OportunidadeBeneficioSchema');

const OportunidadeType = new GraphQLObjectType({
    name: 'OportunidadeList',
    fields: () => ({
        Id: { type: GraphQLString },
        CargaHoraria: { type: GraphQLString },
        Salario: { type: GraphQLString },
        DataLimite: { type: GraphQLString },
        Experiencia: { type: GraphQLString },
        NumVagas: { type: GraphQLString },
        Status: { type: GraphQLInt },
        Detalhes: { type: GraphQLString },
        IsFinalizado: { type: GraphQLInt },
        TipoEmpregoId: { type: GraphQLString },
        TipoEmprego: {
            type: TipoEmpregoType,
            resolve(prev, args) {
                return TipoEmprego.findOne({
                        where: { Id: prev.TipoEmpregoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        TipoFormacaoId: { type: GraphQLString },
        TipoFormacao: {
            type: TipoFormacaoType,
            resolve(prev, args) {
                return TipoFormacao.findOne({
                        where: { Id: prev.TipoFormacaoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeBeneficios: {
            type: new GraphQLList(OportunidadeBeneficioType),
            resolve(prev, args) {
                return OportunidadeBeneficio.findAll({
                        where: { OportunidadeId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeIIdiomas: {
            type: new GraphQLList(OportunidadeIIdiomaType),
            resolve(prev, args) {
                return OportunidadeIdioma.findAll({
                        where: { OportunidadeId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        Cidade: { type: GraphQLString },
        Cargo: {
            type: CargoType,
            resolve(prev, args) {
                return Cargo.findOne({
                        where: { Id: prev.CargoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        OportunidadeCompetencias: {
            type: new GraphQLList(OportunidadeCompetenciaType),
            resolve(prev, args) {
                return OportunidadeCompetencia.findAll({
                        where: { OportunidadeId: prev.Id },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        TipoFuncaoId: { type: GraphQLString },
        TipoFuncao: {
            type: TipoFuncaoType,
            resolve(prev, args) {
                return TipoFuncao.findOne({
                        where: { Id: prev.TipoFuncaoId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        EmpresaId: { type: GraphQLString },
        Empresa: {
            type: EmpresaType,
            resolve(prev, args) {
                return Empresa.findOne({
                        where: { Id: prev.EmpresaId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        ProvinciaId: { type: GraphQLString },
        Provincia: {
            type: ProvinciaType,
            resolve(prev, args) {
                return Provincia.findOne({
                        where: { Id: prev.ProvinciaId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        NacionalidadeId: { type: GraphQLString },
        Nacionalidade: {
            type: NacionalidadeType,
            resolve(prev, args) {
                return Nacionalidade.findOne({
                        where: { Id: prev.NacionalidadeId },
                    })
                    .then((e) => e)
                    .catch((error) => error);
            },
        },
        Candidaturas: {
            type: new GraphQLList(CandidaturaOportunidadeType),
            resolve(prev, _) {
                return Candidatura.findAll({
                        where: { OportunidadeId: prev.Id },
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

const OportunidadePayload = new GraphQLObjectType({
    name: 'OportunidadePayload',
    fields: () => ({
        addOportunidade: {
            type: OportunidadeType,
        },
    }),
});

module.exports = { OportunidadeType, OportunidadePayload };