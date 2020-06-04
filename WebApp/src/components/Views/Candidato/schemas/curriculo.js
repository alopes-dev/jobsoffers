export const CurriculumSchema = `
Id
  Designacao
  Status
  ResumoProfissional
  CandidatoId
  Candidato {
    Id
    Nome
    SobreNome
    Morada
    DataNascimento
    PessoaIdiomas {
      Id
      Percentagem
      Idioma {
        Id
        Designacao
      }
      PessoaId
    }
    PessoaContacto {
      Id
      Contacto {
        Id
        Telefone
        Email
      }
    }
  }
  EstadoId
  createdAt
  updatedAt
  CurriculoSkills {Id
    Skills {
      Id
      Designacao
      Percentagem
    }
  }
  CurriculoHobes {Id
Hobes {
  Id
  Designacao
  Percentagem
  Descricao
}
  }
  CurriculoDetalhes {Id
   Detalhe {
     Id
     Designacao
     NomeDaInstituicao
     DescricaoDaInstituicao
     LocalDaInstituicao
     DataInicio
     DataFim
     Status
     EstadoId
     createdAt
     updatedAt
     TipoDetalhe {
        Id
        tipoIcon
        Designacao
        Descricao
      }
   }
  }
`;

export const CandidaturaCurriculo = `
Id
Status
IsAnalizado
Descricao
Oportunidade {
  Id
  CargaHoraria
  Salario
  DataLimite
  Experiencia
  NumVagas
  IsFinalizado
  TipoEmprego{Designacao}
  TipoFormacao{Designacao}
  Cidade
  TipoFuncao{Designacao}
  Provincia{Designacao}
  Nacionalidade{Designacao}
  EstadoId
  createdAt
  updatedAt
}
EstadoId
createdAt
updatedAt
`;