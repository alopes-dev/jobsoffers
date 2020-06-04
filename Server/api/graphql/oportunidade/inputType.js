const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require('graphql');

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
    EmpresaId: { type: GraphQLString },
    NacionalidadeId: { type: GraphQLString },
    IdiomaId: { type: new GraphQLList(GraphQLString) },
    BeneficioId: { type: new GraphQLList(GraphQLString) },
    EstadoId: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = OportunidadeInput;
