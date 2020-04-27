const {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
} = require('graphql');

const { TipoEmpregoType } = require('../TipoEmpregoSchema');
const { TipoFormacaoType } = require('../TipoFormacaoSchema');
const { CargoType } = require('../CargosSchema');
const { BeneficioType } = require('../BeneficiosSchema');
const { CompetenciaType } = require('../CompetenciasSchema');
const { TipoFuncaoType } = require('../TipoFuncaosSchema');
const { ProvinciaType } = require('../ProvinciasSchema');
const { NacionalidadeType } = require('../NacionalidadesSchema');
const { IdiomaType } = require('../IdiomasSchema');
const { EstadoType } = require('../EstadoSchema');


const OportunidadeInput = new GraphQLInputObjectType({
    name: 'OportunidadeInput',
    fields: () => ({
        Id: { type: GraphQLString },
        CargaHoraria: { type: GraphQLString },
        Salario: { type: GraphQLString },
        DataLimite: { type: GraphQLString },
        Experiencia: { type: GraphQLString },
        NumVagas: { type: GraphQLString },
        Detalhes: { type: GraphQLString },
        IsFinalizado: { type: GraphQLInt },
        TipoEmpregoId: { type: GraphQLString },
        TipoFormacaoId: { type: GraphQLString },
        Cidade: { type: GraphQLString },
        CargoId: { type: GraphQLString },
        CompetenciaId: { type: new GraphQLList(GraphQLString) },
        TipoFuncaoId: { type: GraphQLString },
        ProvinciaId: { type: GraphQLString },
        NacionalidadeId: { type: GraphQLString },
        IdiomaId: { type: new GraphQLList(GraphQLString) },
        BeneficioId: { type: new GraphQLList(GraphQLString) },
        EstadoId: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})


module.exports = OportunidadeInput;