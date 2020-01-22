const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Oportunidade = require('../model/Oportunidade')
const Estado = require('../model/Estado');
const Cidade = require('../model/Cidade');
const Cargo = require('../model/Cargo');
const Beneficio = require('../model/Beneficio');
const Empregador = require('../model/Empregador');

const { CidadeType } = require('./CidadesSchema');
const { CargoType } = require('./CargosSchema');
const { BeneficioType } = require('./BeneficiosSchema');
const { EmpregadorType } = require('./EmpregadorsSchema');
const { EstadoType } = require('./EstadoSchema');
const OportunidadeType = new GraphQLObjectType({
    name: 'OportunidadeObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Percentagem: { type: GraphQLString },
        Descricao: { type: GraphQLString },
        Nome: { type: GraphQLString },
        CargaHoraria: { type: GraphQLString },
        Salario: { type: GraphQLString },
        Data: { type: GraphQLString },
        Localizacao: { type: GraphQLString },
        IsFinalizado: { type: GraphQLInt },
        CidadeId: { type: GraphQLString },
        Cidade: {
            type: CidadeType,
            resolve(prev, args) {
                return Cidade.findOne({
                    where: { Id: prev.CidadeId }
                }).then(e => e).catch(error => error)
            }
        },
        CargoId: { type: GraphQLString },
        Cargo: {
            type: CargoType,
            resolve(prev, args) {
                return Cargo.findOne({
                    where: { Id: prev.CargoId }
                }).then(e => e).catch(error => error)
            }
        },
        EmpregadorId: { type: GraphQLString },
        Empregador: {
            type: EmpregadorType,
            resolve(prev, args) {
                return Empregador.findOne({
                    where: { Id: prev.EmpregadorId }
                }).then(e => e).catch(error => error)
            }
        },
        BeneficioId: { type: GraphQLString },
        Beneficio: {
            type: BeneficioType,
            resolve(prev, args) {
                return Beneficio.findOne({
                    where: { Id: prev.BeneficioId }
                }).then(e => e).catch(error => error)
            }
        },
        EstadoId: { type: GraphQLString },
        Estado: {
            type: EstadoType,
            resolve(prev, args) {
                return Estado.findOne({
                    where: { Id: prev.EstadoId }
                }).then(e => e).catch(error => error)
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const OportunidadeResolve = {
    Oportunidades: {
        type: new GraphQLList(OportunidadeType),
        resolve(parent, args) {
            return Oportunidade.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Oportunidade: {
        type: OportunidadeType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return Oportunidade.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}


module.exports = { OportunidadeResolve, OportunidadeType };