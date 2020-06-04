export const oportunidadeCandidatoSchema = `Id CargaHoraria Salario DataLimite Experiencia NumVagas Detalhes IsFinalizado TipoFuncao { Designacao } TipoFormacao { Designacao }  TipoFuncaoId Provincia { Designacao } Nacionalidade { Designacao } Estado { Designacao } createdAt updatedAt Candidaturas {
    Id
    Status
    IsAnalizado
    Descricao
    CandidatoId
    Candidato {
      Id
      Nome
      SobreNome
      DataNascimento
      Status
      EstadoId
      createdAt
      updatedAt
    }

    EstadoId
    createdAt
    updatedAt
  }`;