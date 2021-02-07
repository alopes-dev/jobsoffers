import React, { useState } from 'react';

import { Container, FloatingButton } from './styles';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useEffect } from 'react';

import iService from '../../../services/service';
import { isEmpty } from '../../../helpers';
import { toast } from 'react-toastify';

function ViewNotification() {
  const [notification, setNotification] = useState({});

  useEffect(() => {
    const Id = localStorage.getItem('@:notificationId');

    iService
      .fetch({
        getById: { field: 'Id', value: Id, consts: 'Id' },
        table: 'SolicitacaoDocumento',
        properties: `Id
        Status
        DetalheEspecifico
        PessoaId
        CandidaturaId
        TipoDocunentoId
        Candidatura{Oportunidade{Empresa {
    
          Designacao
         
        }}}
        TipoDocumento{Designacao}
        EstadoId
        createdAt
        updatedAt`,
      })
      .then(async (res) => {
        console.log(res);
        if (!res.ok) return console.error(res.errors);
        setNotification(res.data[0]);
      })
      .catch((error) => console.log(error));

    iService.useGeneric({
      query: `mutation ($id: String!, $status:Int!) {
          updateNotification(Id:$id,Status:$status) {
            Id
          }
        }`,
      variables: { id: Id, status: 0 },
    });
  }, []);

  return (
    <>
      <Container>
        <div style={{ width: '100%' }}>
          <div className="card card-stats card-round">
            <div className="card-body " style={{ textAlign: 'initial' }}>
              <div>
                <span
                  style={{
                    color: 'black',
                  }}
                >
                  {isEmpty(notification?.Candidatura) ||
                  isEmpty(
                    notification?.Candidatura?.Oportunidade?.Empresa?.Designacao
                  )
                    ? 'Anónimo'
                    : notification?.Candidatura?.Oportunidade?.Empresa?.Designacao?.toUpperCase()}
                </span>

                <p
                  style={{
                    color: 'black',
                  }}
                >
                  {notification?.DetalheEspecifico}
                </p>
                <small className="text-muted">{notification?.createdAt}</small>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ViewNotification;
