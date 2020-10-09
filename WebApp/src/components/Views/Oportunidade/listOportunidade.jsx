import React, { useState, useEffect } from 'react';
import Index from '../../ResusibleComponents/@tables';
import {
  ListOportunidadeFetch,
  removeOportunidade,
} from '../../../store/funcs/fetch';
import { useDispatch, useSelector } from 'react-redux';

import { setOportunidadeId } from '../../../store/actions/oportunidade';

import history from '../../../history';
import { Row, Col, Button } from 'reactstrap';
import Field from '../../ResusibleComponents/Fields/Field';
import { Form } from '@unform/core';
import { useRef } from 'react';

import iService from '../../../services/service';

import { toast } from 'react-toastify';
import { setSelectOp } from '../../../helpers';

const data = [
  { icon: 'flaticon-coins text-success', name: 'Rendimento', value: '1,982' },
  { icon: 'flaticon-users text-primary', name: 'Subscribers', value: '1303' },
  { icon: 'flaticon-graph text-success', name: 'Revenue', value: '1,982' },
  { icon: 'flaticon-interface-6 text-warning', name: 'Number', value: '1,982' },
];

export default function ListOportunidade() {
  const [values, setValues] = useState([]);
  const [filtersValues, setFiltersValues] = useState([]);
  const [tipoFuncao, setTipoFuncao] = useState([]);
  const [experiencia, setExperiencia] = useState([]);
  const dispatch = useDispatch();

  const searchFormRef = useRef(null);

  useEffect(() => {
    ListOportunidadeFetch().then(({ data }) => {
      setValues(data);
      setFiltersValues(data);
    });
  }, []);

  function handleItemClick(e) {
    dispatch(setOportunidadeId(e));
    localStorage.setItem('@oportunidadeId', JSON.stringify(e.Id));
    history.push('/general-view');
  }

  async function handleRemoveItem(oportunidadeId) {
    const response = await removeOportunidade(oportunidadeId);
    console.log(response, 'response');
  }

  function loadFilterData() {
    /** fetch and set TipoEmpregos */
    iService
      .fetch({ table: 'TipoFuncaoes', properties: 'Id Designacao' })
      .then(async (res) => {
        if (!res.ok) return console.error(res.errors);

        let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
        setTipoFuncao(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    loadFilterData();
  }, []);

  function handleSubmit(data, { reset }) {
    Object.keys(data).map((key) => {
      if (data[key] === '') delete data[key];
      return key;
    });

    filtersValues.filter((value) => {
      return value;
    });

    console.log(data);
  }

  function handleFilter({ field, value }) {
    const result = filtersValues.filter(
      (filterValue) => filterValue[field].toLowerCase() === value.toLowerCase()
    );
    setValues(result);
  }

  function handleClick() {
    searchFormRef.current.submitForm();
  }

  function filterComponent() {
    return (
      <Form ref={searchFormRef} onSubmit={handleSubmit}>
        <Row className="mt--4">
          <Col xl="2  pr-0">
            <Field
              type="text"
              fieldtype="select"
              name="tipoFilter"
              options={tipoFuncao}
              onChange={(event) => {
                console.log(event.value);
              }}
            />
          </Col>
          <Col xl="3  pr-0">
            <Field
              type="text"
              fieldtype="input"
              name="value"
              placeholder="António"
              onChange={(event) => {
                console.log(event.target.value);
              }}
            />
          </Col>
          <Col xl="2  pr-0">
            <Field
              type="date"
              fieldtype="input"
              name="dataInicio"
              placeholder="António"
              onChange={(event) => {
                console.log(event.target.value);
              }}
            />
          </Col>
          <Col xl="3  pr-0">
            <Field
              type="text"
              fieldtype="select"
              name="tipoFuncao"
              placeholder="Tipo de Função"
              options={tipoFuncao}
              onChange={(event) => {
                if (!event) return;
                handleFilter({ field: 'TipoFuncao', value: event.label });
              }}
            />
          </Col>
          <Col
            xl="1 pl-0 pr-0"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              padding: '0',
              marginTop: '13px',
            }}
          >
            <Button onClick={handleClick} className="btn-default-color">
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  return (
    <div>
      <Index
        filters={filterComponent}
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
          handleRemoveItem(e.Id);
        }}
        editLine={(e) => {
          localStorage.setItem(
            '@jobs:oportunidade-detalhe',
            JSON.stringify({ oportunidade: e })
          );
          window.location = `oportunidade-details`;
        }}
      />
    </div>
  );
}
