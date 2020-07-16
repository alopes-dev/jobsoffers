import { setSelectOp, isEmpty } from '../../helpers';
import iService from '../../services/service';
import { oportunidadeCandidatoSchema } from './schemas';

import { toast } from 'react-toastify';
// const iService = new IService()

export const OportunidadeRenderData = (props) => {
    const { setValue } = props;

    /** fetch and set TipoFormacaos */
    iService
        .fetch({ table: 'TipoFormacaos', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'TipoFormacaos');
        })
        .catch((error) => console.log(error));

    /** fetch and set TipoEmpregos */
    iService
        .fetch({ table: 'TipoEmpregos', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'TipoEmpregos');
        })
        .catch((error) => console.log(error));

    /** fetch and set TipoEmpregos */
    iService
        .fetch({ table: 'Areas', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'Areas');
        })
        .catch((error) => console.log(error));

    /** fetch and set TipoEmpregos */
    iService
        .fetch({ table: 'Provincias', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'Provincias');
        })
        .catch((error) => console.log(error));

    /** fetch and set TipoEmpregos */
    iService
        .fetch({ table: 'Idiomas', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'Idiomas');
        })
        .catch((error) => console.log(error));

    /** fetch and set TipoEmpregos */
    iService
        .fetch({ table: 'Nacionalidades', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'Nacionalidades');
        })
        .catch((error) => console.log(error));

    /** fetch and set TipoEmpregos */
    iService
        .fetch({ table: 'Beneficios', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'Beneficios');
        })
        .catch((error) => console.log(error));

    iService
        .fetch({ table: 'allEstados', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'allEstados');
        })
        .catch((error) => console.log(error));

    iService
        .fetch({ table: 'Competencias', properties: 'Id Designacao' })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'Competencias');
        })
        .catch((error) => console.log(error));

    /** Experiencia Profissional */

    var data = [];
    for (let i = 0; i < 12; i++) {
        if (i === 0) data.push({ value: 'S/Exp', label: 'S/Exp' });
        else if (i <= 10)
            i === 1 ?
            data.push({ value: i + ' ano', label: i + ' ano' }) :
            data.push({ value: i + ' anos', label: i + ' anos' });
        else data.push({ value: '+ de 10 anos', label: '+ de 10 anos' });
        setValue(data, 'Experiencia');
    }

    /** cargaHorario */
    var cargaHorario = [];
    for (let i = 1; i <= 24; i++) {
        i === 1 ?
            cargaHorario.push({ value: i + ' hr', label: i + ' hr' }) :
            cargaHorario.push({ value: i + ' hrs', label: i + ' hrs' });
        setValue(cargaHorario, 'cargaHorario');
    }

    // iService.store({ value: { Designacao: "AS" }, table: "Estado", properties: 'Designacao Id' }).then(e => {
    //     console.log(e)
    // })
};

export const ListOportunidadeFetch = async() => {
    /** fetch and set TipoEmpregos */
    /** fetch and set TipoEmpregos */

    const { EmpresaId } = JSON.parse(localStorage.getItem('@jobs:user'));
    console.log(EmpresaId);
    let result = await iService.fetch({
        table: 'OportunidadesByEmpresa',
        getById: {
            value: EmpresaId,
            field: 'Id',
            consts: 'EmpresaId',
        },
        properties: `Id CargaHoraria Cidade Salario DataLimite Experiencia NumVagas Detalhes IsFinalizado TipoFuncao { Designacao } TipoFormacao { Designacao } TipoFuncaoId Provincia { Designacao } Nacionalidade { Designacao } Estado { Designacao } createdAt updatedAt`,
    });
    let { data } = result;
    data = data.map((d) => {
        d['TipoFuncao'] = isEmpty(d.TipoFuncao) ?
            'Pendente' :
            d.TipoFuncao.Designacao;
        d['TipoFormacao'] = isEmpty(d.TipoFormacao) ?
            'Pendente' :
            d.TipoFormacao.Designacao;
        d['Provincia'] = isEmpty(d.Provincia) ? 'Pendente' : d.Provincia.Designacao;
        d['Nacionalidade'] = isEmpty(d.Nacionalidade) ?
            'Pendente' :
            d.Nacionalidade.Designacao;
        d['Estado'] = isEmpty(d.Estado) ? 'Pendente' : d.Estado.Designacao;
        return d;
    });
    result.data = data;
    return result;
};

export const removeOportunidade = async(oportunidadeId) => {
    return await iService.delete({
        table: 'Oportunidade',
        getById: {
            value: oportunidadeId,
            consts: 'Id',
        },
        properties: `Id`,
    });
};

export const getFuncoesByAreaId = (Id, props) => {
    const { setValue } = props;
    /** fetch and set TipoEmpregos */
    iService
        .fetch({
            getById: { field: 'AreaId', value: Id },
            table: 'TipoFuncoes',
            properties: 'Id Designacao',
        })
        .then(async(res) => {
            if (!res.ok) return console.error(res.errors);
            let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
            setValue(data, 'TipoFuncoes');
        })
        .catch((error) => console.log(error));
};

export const moreInformation = async(id) => {
    const response = await iService.fetch({
        getById: { value: id, field: 'Id', consts: 'Id' },
        table: 'oportunidade',
        properties: oportunidadeCandidatoSchema,
    });

    return response;
};

export const approveCandidato = async(request) => {
    const response = await iService.update({
        table: 'Candidatura',
        type: 'UPDATE',
        properties: 'Id IsAnalizado',
        value: {...request },
    });

    if (!response.ok) return toast.error(response.errors[0].message);

    response.data.updateCandidatura.IsAnalizado === -1 ?
        toast.warning('Rejeitado!') :
        toast.success('Aprovado!');

    return response.data.updateCandidatura;
};