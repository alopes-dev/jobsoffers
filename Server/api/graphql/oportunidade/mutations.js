const { GraphQLNonNull, GraphQLString } = require('graphql');
const { OportunidadePayload } = require('./type')
const OportunidadeInput = require('./inputType')
const Oportunidade = require('../../model/Oportunidade')
const OportunidadeIdioma = require('../../model/OportunidadeIdioma')
const OportunidadeBeneficio = require('../../model/OportunidadeBeneficio')
const OportunidadeCompetencia = require('../../model/OportunidadeCompetencia')
const { isEmpty } = require('../../../helpers')
const uuid = require('uuid/v4')

const OportunidadeMutation = {

    oportunidadeInput: {
        type: OportunidadePayload,
        args: {
            input: {
                type: OportunidadeInput
            }
        },
        async resolve(parent, { input }) {
            const sysdate = new Date(Date.now())
            const { IdiomaId, BeneficioId, CompetenciaId } = input;

            //Eliminar as propriedade não muito importantes
            delete input.IdiomaId;
            delete input.BeneficioId;
            delete input.CompetenciaId;

            //Criar uma linha de oportunidade
            const data = await Oportunidade.create({
                Id: uuid(),
                ...input,
                CreatedAt: sysdate,
                UpdatedAt: sysdate,
            }).then(e => e).catch(err => err)

            const { Id, EstadoId } = data.dataValues;
            //Adicionar Idiomas de uma oportunidade
            if (!isEmpty(Id) && !isEmpty(IdiomaId)) {
                let osysdate = new Date(Date.now())
                IdiomaId.forEach(async function(idioma) {
                    await OportunidadeIdioma.create({
                        Id: uuid(),
                        IdiomaId: idioma,
                        OportunidadeId: Id,
                        EstadoId,
                        CreatedAt: osysdate,
                        UpdatedAt: osysdate,
                    });
                })
            }

            //Adicionar Idiomas de uma oportunidade
            if (!isEmpty(Id) && !isEmpty(BeneficioId)) {
                let osysdate = new Date(Date.now())
                BeneficioId.forEach(async function(beneficio) {
                    let data = await OportunidadeBeneficio.create({
                        Id: uuid(),
                        BeneficioId: beneficio,
                        OportunidadeId: Id,
                        EstadoId,
                        CreatedAt: osysdate,
                        UpdatedAt: osysdate,
                    });
                    console.log(data)
                })
            }

            //Adicionar Idiomas de uma oportunidade
            if (!isEmpty(Id) && !isEmpty(CompetenciaId)) {
                let osysdate = new Date(Date.now())
                CompetenciaId.forEach(async function(competencia) {
                    let data = await OportunidadeCompetencia.create({
                        Id: uuid(),
                        CompetenciaId: competencia,
                        OportunidadeId: Id,
                        EstadoId,
                        CreatedAt: osysdate,
                        UpdatedAt: osysdate,
                    });
                    console.log(data)
                })
            }


            return data.dataValues;
        }
    },

    // updateOportunidade: {
    //     type: OportunidadeType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) },
    //         Designacao: { type: new GraphQLNonNull(GraphQLString) }
    //     },
    //     resolve(parent, args) {
    //         return Estado.update({
    //             Designacao: args.Designacao,
    //             UpdatedAt: new Date().toJSON()
    //         }, { where: { Id: args.Id } }).then(e => args).catch(err => err)
    //     }
    // },
    // deleteOportunidade: {
    //     type: OportunidadeType,
    //     args: {
    //         Id: { type: new GraphQLNonNull(GraphQLString) }
    //     },
    //     resolve(parent, args) {
    //         return Estado.destroy({ where: { Id: args.Id } }).then(e => e).catch(err => err)
    //     }
    // }
}

module.exports = OportunidadeMutation;