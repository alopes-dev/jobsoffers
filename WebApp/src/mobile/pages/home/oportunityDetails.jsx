import React, { useState } from 'react';

import { Container, FloatingButton } from './styles';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useEffect } from 'react';

import iService from '../../../services/service';
import { isEmpty } from '../../../helpers';
import { toast } from 'react-toastify';

function MobileOportunityDetails() {
  const [oportunidade, setOportunidade] = useState({});

  const { PessoaId } = JSON.parse(localStorage.getItem('@jobs:user'));

  useEffect(() => {
    const Id = localStorage.getItem('@:oportunidadeId');
    iService
      .fetch({
        getById: { field: 'Id', value: Id, consts: 'Id' },
        table: 'oportunidade',
        properties: `Id
        CargaHoraria
        Salario
        DataLimite
        Experiencia
        NumVagas
        Detalhes
        IsFinalizado
        TipoEmprego{Designacao}
        TipoFormacao{Designacao}
        Cidade
        TipoFuncao{Designacao}
        EmpresaId
        Empresa{Designacao}
        Provincia{Designacao}
        Nacionalidade{Designacao}
        Estado{Designacao}
        createdAt
        updatedAt`,
      })
      .then(async (res) => {
        if (!res.ok) return console.error(res.errors);
        setOportunidade(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  async function subscribeOportunity({ OportunidadeId, CandidatoId }) {
    const res = await iService.store({
      table: 'Candidatura',
      useExclamation: true,
      type: 'STORE',
      properties: 'Id Status',
      value: { OportunidadeId, CandidatoId },
    });

    if (!res.ok) return toast.error(res?.errors[0]?.message);

    return toast.success('Candidatura efetuada com sucesso!!');
  }

  return (
    <>
      <Container>
        <Row>
          <div
            className="col-12"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="icon-big text-left">
              <i
                style={{ color: '#fff' }}
                className={`flaticon-interface-6`}
              ></i>
            </div>
            <h3 style={{ margin: '10px' }}>
              {oportunidade?.TipoFuncao?.Designacao}
            </h3>
          </div>{' '}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 20px',
              width: '100%',
              marginTop: '20px',
            }}
          >
            <span>Cidade : {oportunidade?.Cidade}</span>
            <span>Nº Vagas : {oportunidade?.NumVagas}</span>
            <span>Experiência : {oportunidade?.Experiencia}</span>
            <span>Carga Horária : {oportunidade?.CargaHoraria}</span>
            <span>Data Limite : {oportunidade?.DataLimite}</span>
            <span>Experiência : {oportunidade?.Experiencia}</span>
            <span>Formação : {oportunidade?.TipoFormacao?.Designacao}</span>
            <span>
              Nacionalidade : {oportunidade?.Nacionalidade?.Designacao}
            </span>
            <span>Tipo Contrato : {oportunidade?.TipoEmprego?.Designacao}</span>
            <span>
              Organização :
              {isEmpty(oportunidade?.Empresa) ||
              isEmpty(oportunidade?.Empresa?.Designacao)
                ? 'Anónimo'
                : oportunidade?.Empresa?.Designacao}
            </span>
            <span>Estado : {oportunidade?.Estado?.Designacao}</span>
            <span className="text-primary " style={{ marginTop: '10px' }}>
              Detalhes da vaga.
            </span>
            <p>{oportunidade?.Detalhes}</p>
          </div>
        </Row>

        <FloatingButton
          onClick={async () => {
            if (isEmpty(PessoaId))
              return toast.error('Candidato desconhecido, tente novamente...');
            const res = await subscribeOportunity({
              OportunidadeId: oportunidade.Id,
              CandidatoId: PessoaId,
            });
            console.log(res);
          }}
        >
          <div className="anchor-button subscribe">
            <span className="subscribe">
              <i className="flaticon-arrow"></i>
            </span>
            <strong className="subscribe">Candidatar-se</strong>
          </div>
        </FloatingButton>
      </Container>

      {/*  */}
    </>
  );
}

export default MobileOportunityDetails;
