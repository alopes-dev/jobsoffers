import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import iService from '../../../services/service';

// import { Container } from './styles';

const MobileNotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  const getAndSetUserProperties = async () => {
    const user = localStorage.getItem('@jobs:user');
    if (user) {
      const { PessoaId } = JSON.parse(user);

      iService
        .fetch({
          getById: { field: 'Id', value: PessoaId, consts: 'PessoaId' },
          table: 'SolicitacaoDocumento',
          properties: `  Id
          Status
          DetalheEspecifico
          CandidaturaId
          Candidatura{Oportunidade{Empresa{Designacao}}}
          TipoDocunentoId
          Pessoa{Nome SobreNome }
          TipoDocumento {
            Id
            Designacao
          }
          EstadoId
          createdAt
          updatedAt`,
        })
        .then((response) => {
          console.log(response);
          if (!response.ok) return toast.error(response?.errors[0]?.message);

          setNotifications(response.data);
        });
    }
  };

  useEffect(() => {
    getAndSetUserProperties();
  }, []);

  return (
    <>
      <div>
        <i
          className="flaticon-alarm-1"
          style={{
            fontSize: '40px',
            position: 'absolute',
            top: '-14px',
            color: '#ffc001',
            left: '16px',
          }}
        ></i>{' '}
        <span
          style={{
            position: 'absolute',
            top: '0px',
            left: ' 50%',
            fontSize: '23px',
            fontWeight: 'bold',
            transform: 'translateX(-50%)',
          }}
        >
          Notificações
        </span>
      </div>
      {notifications?.map((item, index) => {
        return (
          <div
            className="col-sm-6 col-md-6"
            key={Math.random() + Math.random() + index}
            // onClick={() => handleOportunityClicked(Id)}
          >
            <div
              className="card card-stats card-round"
              style={{ background: ' #607D8B' }}
            >
              <div className="card-body ">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-left">
                      <i
                        style={{ color: '#ffc001' }}
                        className={`flaticon-web`}
                      ></i>
                    </div>
                  </div>
                  <div className="col-7 col-stats">
                    <div className="numbers">
                      <p
                        className="card-category"
                        style={{ color: '#ffffff', fontWeight: 'bold' }}
                      >
                        {item?.TipoDocumento?.Designacao}{' '}
                      </p>
                      <div style={{ display: 'flex' }}>
                        <span style={{ color: '#333', marginRight: '2px' }}>
                          {/* {Cidade}, */}
                        </span>
                        <span
                          style={{
                            color: '#333',
                            marginLeft: '2px',
                            fontWeight: 'bold',
                          }}
                        >
                          {item?.DetalheEspecifico}
                        </span>
                      </div>
                      <p
                        className="card-category"
                        style={{ color: '#ffffff', fontWeight: 'bold' }}
                      >
                        Org:{' '}
                        {item?.Candidatura?.Oportunidade?.Empresa?.Designacao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MobileNotificationsScreen;
