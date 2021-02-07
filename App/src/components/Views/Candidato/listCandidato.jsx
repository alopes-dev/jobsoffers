import React, { useState, useCallback, useEffect, useRef } from 'react';
import Index from '../../ResusibleComponents/@tables';

import iService from '../../../services/service';
import { Candidatos } from './schemas/curriculo';
import { Row, Col } from 'reactstrap';
import Field from '../../ResusibleComponents/Fields/Field';
import { Form } from '@unform/core';
import history from '../../../history';
import { setSelectOp } from '../../../helpers';

export default function ListCandidato() {
  const [values, setValues] = useState([{ Avatar: 'Antonio' }]);
  const [filtersValues, setFiltersValues] = useState([]);
  const searchFormRef = useRef(null);
  const [tipoFuncao, setTipoFuncao] = useState([]);
  const [tipoFormacao, setTipoFormacao] = useState([]);
  const [cargos, setCargos] = useState([]);

  const getCandidatos = useCallback(async () => {
    const { EmpresaId } = JSON.parse(localStorage.getItem('@jobs:user')),
      candidatoIds = [],
      ArrayOfCandidatos = [];
    const response = await iService.fetch({
      table: 'Candidaturas',
      query: {},
      properties: Candidatos,
    });

    if (!response) return;
    const { data } = response;

    const result = data
      ?.filter(({ Oportunidade }) => Oportunidade.EmpresaId === EmpresaId)
      .map(({ Id, Oportunidade, Candidato }) => {
        Candidato['Nome'] = ` ${Candidato.Nome}  ${Candidato.SobreNome}`;
        Candidato['Estado'] = Candidato.Estado?.Designacao;
        Candidato['Telefone'] =
          Candidato?.PessoaContacto[0]?.Contacto?.Telefone;
        Candidato['Email'] = Candidato?.PessoaContacto[0]?.Contacto?.Email;
        Candidato['Idioma'] = Candidato?.PessoaIdiomas[0]?.Idioma?.Designacao;

        Candidato['Cargo'] = Oportunidade?.Cargo?.Id;
        Candidato['TipoFuncao'] = Oportunidade?.TipoFuncao?.Id;
        Candidato['TipoFormacao'] = Oportunidade?.TipoFormacao?.Id;

        Candidato['CandidaturaId'] = Id;

        return { Avatar: '', ...Candidato };
      })
      .forEach((candidato) => {
        if (candidatoIds.indexOf(candidato.Id) < 0) {
          ArrayOfCandidatos.push(candidato);
          candidatoIds.push(candidato.Id);
        }
      });

    setValues(ArrayOfCandidatos);
    setFiltersValues(ArrayOfCandidatos);
  }, []);

  const getFilterData = useCallback(() => {
    iService
      .fetch({ table: 'TipoFuncaoes', properties: 'Id Designacao' })
      .then(async (res) => {
        if (!res.ok) return console.error(res.errors);
        let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
        setTipoFuncao(data);
      })
      .catch((error) => console.log(error));

    iService
      .fetch({ table: 'TipoFormacaos', properties: 'Id Designacao' })
      .then(async (res) => {
        if (!res.ok) return console.error(res.errors);
        let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
        setTipoFormacao(data);
      })
      .catch((error) => console.log(error));

    iService
      .fetch({ table: 'Cargos', properties: 'Id Designacao' })
      .then(async (res) => {
        if (!res.ok) return console.error(res.errors);
        let data = setSelectOp(res.data, { value: 'Id', label: 'Designacao' });
        setCargos(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getFilterData();
  }, [getCandidatos]);

  useEffect(() => {
    getCandidatos();
  }, [getCandidatos]);

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
    const result = filtersValues.filter((filterValue) =>
      filterValue[field].toLowerCase().includes(value.toLowerCase())
    );
    setValues(result);
  }

  function filterComponent() {
    return (
      <Form ref={searchFormRef} onSubmit={handleSubmit}>
        <Row className="mt--4">
          <Col xl="3  pr-0">
            <Field
              type="text"
              fieldtype="input"
              name="Nome"
              placeholder="Nome do Candidato"
              onChange={(event) => {
                if (!event) return;
                handleFilter({ field: 'Nome', value: event.target.value });
              }}
            />
          </Col>
          <Col xl="3  pr-0">
            <Field
              type="date"
              fieldtype="input"
              name="DataNascimento"
              placeholder="António"
              onChange={(event) => {
                if (!event) return;
                handleFilter({
                  field: 'DataNascimento',
                  value: event.target.value,
                });
              }}
            />
          </Col>
          <Col xl="4  pr-0">
            <Field
              type="text"
              fieldtype="input"
              name="Morada"
              placeholder="Morada"
              onChange={(event) => {
                if (!event) return;
                handleFilter({ field: 'Morada', value: event.target.value });
              }}
            />
          </Col>
          <Col xl="3  pr-0">
            <Field
              type="text"
              fieldtype="select"
              name="TipoFuncao"
              placeholder="Funções"
              options={tipoFuncao}
              onChange={(event) => {
                if (!event) return;
                handleFilter({ field: 'TipoFuncao', value: event.value });
              }}
            />
          </Col>
          <Col xl="3  pr-0">
            <Field
              type="text"
              fieldtype="select"
              name="TipoFormacao"
              placeholder="Formações"
              options={tipoFormacao}
              onChange={(event) => {
                if (!event) return;
                handleFilter({ field: 'TipoFormacao', value: event.value });
              }}
            />
          </Col>
          <Col xl="3  pr-0">
            <Field
              type="text"
              fieldtype="select"
              name="Cargo"
              placeholder=" Cargo"
              options={cargos}
              onChange={(event) => {
                if (!event) return;
                handleFilter({ field: 'Cargo', value: event.value });
              }}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  return (
    <div>
      <Index
        filters={filterComponent}
        values={values}
        options={{
          Avatar: {
            preview: 'Avatar',
          },
          Nome: {
            preview: 'Nome Completo',
          },
          DataNascimento: {
            preview: 'Data de Nascimento',
          },
          Telefone: {
            preview: 'Telefone',
          },

          Email: {
            preview: 'Email',
          },
          Idioma: {
            preview: 'Idioma',
          },
          Morada: {
            preview: 'Morada',
          },

          Estado: {
            preview: 'Estado',
          },
        }}
        onItemClick={(e) => {
          console.log(e);
          localStorage.setItem(
            '@Candidatura',
            JSON.stringify({
              CandidatoId: e.Id,
              CandidaturaId: e.CandidaturaId,
            })
          );

          history.push(`/curriculum-viewer`);
        }}
        // removeLine={(e) => {
        //   handleRemoveItem(e.Id);
        // }}
        editLine={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}
