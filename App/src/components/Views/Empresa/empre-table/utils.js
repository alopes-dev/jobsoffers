export const EmployersSchemas = `query{Empresas {
  Id
  Designacao
  Nif
  Telefone
  Estado{Designacao}
  createdAt
  updatedAt
}}`