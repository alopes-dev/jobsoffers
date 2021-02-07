const { OportunidadeType } = require('./type');
const OportunidadeInput = require('./inputType');
const Oportunidade = require('../../model/Oportunidade');
const OportunidadeIdioma = require('../../model/OportunidadeIdioma');
const OportunidadeBeneficio = require('../../model/OportunidadeBeneficio');
const OportunidadeCompetencia = require('../../model/OportunidadeCompetencia');
const { isEmpty } = require('../../../helpers');

const uuid = require('uuid/v4');
const { GraphQLNonNull, GraphQLString } = require('graphql');
const Candidatura = require('../../model/Candidatura');

const OportunidadeMutation = {
    addOportunidade: {
        type: OportunidadeType,
        args: {
            input: {
                type: OportunidadeInput,
            },
        },
        async resolve(parent, { input }) {
            const sysdate = new Date(Date.now());
            const { IdiomaId, BeneficioId, CompetenciaId } = input;

            //Eliminar as propriedade não muito importantes
            delete input.IdiomaId;
            delete input.BeneficioId;
            delete input.CompetenciaId;

            console.log(input);

            // return;g

            //Criar uma linha de oportunidade
            const data = await Oportunidade.create({
                    Id: uuid(),
                    ...input,
                    CreatedAt: sysdate,
                    UpdatedAt: sysdate,
                })
                .then((e) => e)
                .catch((err) => err);

            const { Id, EstadoId } = data.dataValues;
            //Adicionar Idiomas de uma oportunidade
            if (!isEmpty(Id) && !isEmpty(IdiomaId)) {
                let osysdate = new Date(Date.now());
                IdiomaId.forEach(async function(idioma) {
                    await OportunidadeIdioma.create({
                        Id: uuid(),
                        IdiomaId: idioma,
                        OportunidadeId: Id,
                        EstadoId,
                        CreatedAt: osysdate,
                        UpdatedAt: osysdate,
                    });
                });
            }

            //Adicionar Idiomas de uma oportunidade
            if (!isEmpty(Id) && !isEmpty(BeneficioId)) {
                let osysdate = new Date(Date.now());
                BeneficioId.forEach(async function(beneficio) {
                    let data = await OportunidadeBeneficio.create({
                        Id: uuid(),
                        BeneficioId: beneficio,
                        OportunidadeId: Id,
                        EstadoId,
                        CreatedAt: osysdate,
                        UpdatedAt: osysdate,
                    });
                });
            }

            //Adicionar Idiomas de uma oportunidade
            if (!isEmpty(Id) && !isEmpty(CompetenciaId)) {
                let osysdate = new Date(Date.now());
                CompetenciaId.forEach(async function(competencia) {
                    let data = await OportunidadeCompetencia.create({
                        Id: uuid(),
                        CompetenciaId: competencia,
                        OportunidadeId: Id,
                        EstadoId,
                        CreatedAt: osysdate,
                        UpdatedAt: osysdate,
                    });
                });
            }

            return data.dataValues;
        },
    },

    updateOportunidade: {
        type: OportunidadeType,
        args: {
            input: {
                type: OportunidadeInput,
            },
            Id: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, { input, Id }) {
            const sysdate = new Date(Date.now());
            const { IdiomaId, BeneficioId, CompetenciaId } = input;
            delete input.IdiomaId;
            delete input.BeneficioId;
            delete input.CompetenciaId;

            if (isEmpty(Id)) console.log('Throw new error');
            //Criar uma linha de oportunidade
            const data = await Oportunidade.update({
                ...input,
                UpdatedAt: sysdate,
            }, { where: { Id } });

            return data;
        },
    },
    deleteOportunidade: {
        type: OportunidadeType,
        args: {
            Id: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
            const response = await Candidatura.destroy({
                where: { OportunidadeId: args.Id },
            });
            console.log(response);
            return await Oportunidade.destroy({ where: { Id: args.Id } });
        },
    },
    deleteOrUpdateOportunidade: {
        type: OportunidadeType,
        args: {
            Id: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, { input, Id }) {
            const sysdate = new Date(Date.now());
            const data = await Oportunidade.update({
                Status: 0,
                UpdatedAt: sysdate,
            }, { where: { Id } });

            return data;
        },
    },
};

module.exports = OportunidadeMutation;