import React from 'react';
import { Card, Col, CardHeader, CardBody } from 'reactstrap';
// import { Container } from './styles';

function HistoricoOportunidade({ historics }) {
  return (
    <Col xl="6" md="6" lg="6">
      <Card>
        <CardHeader>Histórico de Actividade</CardHeader>
        <CardBody>
          <ol className="activity-feed">
            {historics?.map((historic) => {
              return (
                <li className="feed-item feed-item-warning" key={historic.Id}>
                  <time className="date">
                    {new Date(historic.createdAt).toUTCString()}
                  </time>
                  <span className="text">
                    {`${historic?.Candidato.Nome} ${historic?.Candidato.SobreNome} - `}
                    <small className="text-muted"> Candidatou-se à vaga.</small>
                  </span>
                </li>
              );
            })}
          </ol>
        </CardBody>
      </Card>
    </Col>
  );
}

export default HistoricoOportunidade;
