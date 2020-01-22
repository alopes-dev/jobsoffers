const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');
const AvaliacaoCurriculo = require('../model/AvaliacaoCurriculo')
const Estado = require('../model/AvaliacaoCurriculo');
const { EstadoType } = require('./EstadoSchema')

const AvaliacaoCurriculoType = new GraphQLObjectType({
    name: 'AvaliacaoCurriculoObject',
    fields: () => ({
        Id: { type: GraphQLString },
        Designacao: { type: GraphQLString },
        IsFavorito: { type: GraphQLString },
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

const AvaliacaoCurriculoResolve = {
    AvaliacaoCurriculos: {
        type: new GraphQLList(AvaliacaoCurriculoType),
        resolve(parent, args) {
            return AvaliacaoCurriculo.findAll()
                .then(e => e)
                .catch(error => error)
        }
    },
    AvaliacaoCurriculo: {
        type: AvaliacaoCurriculoType,
        args: { Id: { type: GraphQLString } },
        resolve(parent, args) {
            return AvaliacaoCurriculo.findOne({
                    where: { Id: args.Id }
                })
                .then(e => e)
                .catch(error => error)
        }
    }
}

const AvaliacaoCurriculoMutation = {
    addAvaliacaoCurriculo: {
        type: AvaliacaoCurriculoType,
        args: {
            Designacao: { type: GraphQLString },
            IsFavorito: { type: GraphQLString },
            EstadoId: { type: GraphQLString },
        },
        resolve(parent, args) {
            const sysdate = new Date(Date.now())
            return AvaliacaoCurriculo.create({
                Id: uuid(),
                Designacao: args.Designacao,
                IsFavorito: args.IsFavorito,
                EstadoId: args.EstadoId,
                CreatedAt: sysdate,
                UpdatedAt: sysdate,
            }).then(e => e).catch(err => err)
        }
    },
    updateAvaliacaoCurriculo: {
        type: AvaliacaoCurriculoType,
        args: {
            Id: { type: GraphQLString },
            Designacao: { type: GraphQLString },
            IsFavorito: { type: GraphQLString },
            EstadoId: { type: GraphQLString },
        },
        resolve(parent, args) {
            args['UpdatedAt'] = new Date().toJSON()
            return AvaliacaoCurriculo.update(args, { where: { Id: args.Id } }).then(e => args).catch(err => err)
        }
    },
    deleteAvaliacaoCurriculo: {
        type: AvaliacaoCurriculoType,
        args: {
            Id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            return AvaliacaoCurriculo.destroy({ where: { Id: args.Id } }).then(e => e).catch(err => err)
        }
    }
}

module.exports = { AvaliacaoCurriculoResolve, AvaliacaoCurriculoType, AvaliacaoCurriculoMutation };