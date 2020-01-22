const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = require('graphql');
const Empresa = require('../model/Empresa')
const Estado = require('../model/Estado');
const SectorDeAtividade = require('../model/SectorDeAtividade');
const Cidade = require('../model/Cidade');

const { SectorDeAtividadeType } = require('./SectorDeAtividadesSchema');
const { CidadeType } = require('./CidadesSchema');
const { EstadoType } = require('./EstadoSchema');


const EmpresaType = new GraphQLObjectType({
    name: 'EmpresaObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        Nif: { type: GraphQLString },
        RazaoSocial: { type: GraphQLString },
        Missao: { type: GraphQLString },
        Visao: { type: GraphQLString },
        NumFuncionario: { type: GraphQLString },
        CidadeId: { type: GraphQLString },
        Cidade: {
            type: CidadeType,
            resolve(prev, args) {
                return Cidade.findOne({
                    where: { Id: prev.CidadeId }
                }).then(e => e).catch(error => error)
            }
        },
        SectorDeAtividadeId: { type: GraphQLString },
        SectorDeAtividade: {
            type: SectorDeAtividadeType,
            resolve(prev, args) {
                return SectorDeAtividade.findOne({
                    where: { Id: prev.SectorDeAtividadeId }
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

const EmpresaResolve = {
    Empresas: {
        type: new GraphQLList(EmpresaType),
        resolve(parent, args) {
            return Empresa.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    Empresa: {
        type: EmpresaType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            console.log(args)
            return Empresa.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}

module.exports = { EmpresaResolve, EmpresaType };