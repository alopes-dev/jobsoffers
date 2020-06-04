import React from 'react';
import { Card, Col, CardHeader, CardBody } from 'reactstrap';

function OportunityDetails({
  CargaHoraria,
  DataLimite,
  Experiencia,
  Nacionalidade,
  Salario,
  TipoFuncao,
  TipoFormacao,
  Provincia,
  Estado,
}) {
  return (
    <Col xl="6" md="6" lg="6">
      <Card>
        <CardHeader>Detalhe da Oportunidade</CardHeader>
        <CardBody>
          <div className="d-flex">
            <div className="flex-1 ml-2">
              <h6 className="fw-600 mb-1">Carga Horária</h6>
              <small className="text-muted">{CargaHoraria}</small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1  ml-2">
              <h6 className="fw-600 mb-1">Salário</h6>
              <small className="text-muted">{Salario}</small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1 ml-2">
              <h6 className="fw-600 mb-1">Data Limite</h6>
              <small className="text-muted">
                {new Date(DataLimite).toUTCString()}
              </small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1  ml-2">
              <h6 className="fw-600 mb-1">Experiência</h6>
              <small className="text-muted">{Experiencia}</small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1 ml-2">
              <h6 className="fw-600 mb-1">Função</h6>
              <small className="text-muted">{TipoFuncao?.Designacao}</small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1 ml-2">
              <h6 className="fw-600 mb-1">Formação</h6>
              <small className="text-muted">{TipoFormacao?.Designacao}</small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1 ml-2">
              <h6 className="fw-600 mb-1">Nacionalidade Querida</h6>
              <small className="text-muted">{Nacionalidade?.Designacao}</small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1 ml-2">
              <h6 className="fw-600 mb-1">Provincia</h6>
              <small className="text-muted">{Provincia?.Designacao}</small>
            </div>
          </div>
          <div className="separator-dashed"></div>
          <div className="d-flex">
            <div className="flex-1 ml-2">
              <h6 className="fw-600 mb-1">Estado</h6>
              <small className="text-muted">{Estado?.Designacao}</small>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default OportunityDetails;
