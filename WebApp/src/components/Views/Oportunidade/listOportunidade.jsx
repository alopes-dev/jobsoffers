import React, { useState, useEffect } from 'react';
import Index from '../../ResusibleComponents/@tables';
import { ListOportunidadeFetch } from '../../../store/funcs/fetch';
import { useDispatch, useSelector } from 'react-redux';

import { setOportunidadeId } from '../../../store/actions/oportunidade';

import history from '../../../history';

const data = [
  { icon: 'flaticon-coins text-success', name: 'Rendimento', value: '1,982' },
  { icon: 'flaticon-users text-primary', name: 'Subscribers', value: '1303' },
  { icon: 'flaticon-graph text-success', name: 'Revenue', value: '1,982' },
  { icon: 'flaticon-interface-6 text-warning', name: 'Number', value: '1,982' },
];

export default function ListOportunidade() {
  const [values, setValues] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    ListOportunidadeFetch().then(({ data }) => {
      setValues(data);
    });
  }, []);

  function handleItemClick(e) {
    dispatch(setOportunidadeId(e));
    localStorage.setItem('@oportunidadeId', JSON.stringify(e.Id));
    history.push('/general-view');
  }

  return (
    <div>
      <Index
        ilustrate={{ data }}
        values={values}
        options={{
          Salario: {
            preview: 'Salário',
          },
          Experiencia: {
            preview: 'Experiência',
          },
          NumVagas: {
            preview: 'Nº de Vagas',
          },
          TipoFuncao: {
            preview: 'Tipo de Função',
          },
          TipoFormacao: {
            preview: 'Tipo de Formação',
          },
          Provincia: {
            preview: 'Tipo de Função',
          },
          Nacionalidade: {
            preview: 'País',
          },
          Estado: {
            preview: 'Estado',
          },
        }}
        onItemClick={handleItemClick}
        removeLine={(e) => {
          console.log(e);
        }}
        editLine={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}
