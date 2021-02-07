import React, { useState, useEffect } from 'react';

import { Container } from './styles';
import iService from '../../../services/service';
import { toast } from 'react-toastify';

const MobileProfileScreen = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [birthDay, setBirthDay] = useState('00-00-00');
  const [address, setAddress] = useState('');
  const [job, setJob] = useState('');

  const getAndSetUserProperties = async () => {
    const user = localStorage.getItem('@jobs:user');
    if (user) {
      const { UserName, PessoaId, ...rest } = JSON.parse(user);
      iService
        .fetch({
          getById: { field: 'Id', value: PessoaId, consts: 'Id' },
          table: 'Pessoa',
          properties: `Id
        Nome
        SobreNome
        Morada
        DataNascimento
        Status
        EstadoId
        createdAt
        updatedAt`,
        })
        .then((Pessoa) => {
          if (!Pessoa.ok) return toast.error(Pessoa?.errors[0]?.message);

          const { DataNascimento, Morada } = Pessoa.data[0];
          setBirthDay(DataNascimento);
          setAddress(Morada);
          setUserNameOrEmail(UserName);
        });

      iService
        .fetch({
          getById: { field: 'Id', value: PessoaId, consts: 'CandidatoId' },
          table: 'Curriculo',
          properties: ` Id
        Designacao
        Status
        CandidatoId
        ResumoProfissional
        EstadoId
        createdAt
        updatedAt`,
        })
        .then((Curriculo) => {
          if (!Curriculo.ok) return toast.error(Curriculo?.errors[0]?.message);
          const { Designacao } = Curriculo.data;

          setJob(Designacao);
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
          className="flaticon-profile"
          style={{
            fontSize: '40px',
            position: 'absolute',
            top: '-14px',
            color: '#ffc001',
            left: '27px',
          }}
        ></i>{' '}
        <span
          style={{
            position: 'absolute',
            top: '0px',
            left: ' 50%',
            fontSize: '23px',
            fontWeight: 'bold',
            width: '100%',
            transform: 'translateX(-25%)',
          }}
        >
          Meu perfil
        </span>
      </div>
      <Container>
        <div className="col-md-4">
          <div className="card card-profile">
            <div
              className="card-header img-background"
              // style={{backgroundImage: "url('./img/profile.jpg')"}}
            >
              <div className="profile-picture">
                <div className="avatar avatar-xl">
                  <img
                    src="./img/profile.jpg"
                    alt="..."
                    className="avatar-img rounded-circle"
                    style={{ width: '20vw', height: '11vh' }}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="user-profile text-center">
                <div className="name">
                  {userNameOrEmail}, <small>{birthDay.split('-')[2]}</small>
                </div>
                <div className="job">{job}</div>
                <div className="desc">{address}</div>
                <div className="social-media">
                  <a
                    className="btn btn-info btn-twitter btn-sm btn-link"
                    href="#"
                  >
                    <span className="btn-label just-icon">
                      <i className="flaticon-twitter"></i>{' '}
                    </span>
                  </a>
                  <a
                    className="btn btn-danger btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span className="btn-label just-icon">
                      <i className="flaticon-google-plus"></i>{' '}
                    </span>
                  </a>

                  <a
                    className="btn btn-danger btn-sm btn-link"
                    rel="publisher"
                    href="#"
                  >
                    <span className="btn-label just-icon">
                      <i className="flaticon-dribbble"></i>{' '}
                    </span>
                  </a>
                </div>
                <div className="view-profile">
                  <a
                    href="#"
                    className="btn btn-default-color text-white btn-block"
                  >
                    Configuração do seu perfil{' '}
                    <i
                      style={{ float: 'right' }}
                      className="flaticon-arrow"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row user-stats text-center">
                <div className="col">
                  <div className="number">125</div>
                  <div className="title">Post</div>
                </div>
                <div className="col">
                  <div className="number">25K</div>
                  <div className="title">Followers</div>
                </div>
                <div className="col">
                  <div className="number">134</div>
                  <div className="title">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MobileProfileScreen;
