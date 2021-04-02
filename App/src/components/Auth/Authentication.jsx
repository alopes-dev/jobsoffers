import React, { Fragment, useEffect } from 'react';
// nodejs library that concatenates classes
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from 'reactstrap';
import Field from '../ResusibleComponents/Fields/Field';
import { isEmpty } from '../../helpers';
import Spinner from '../ResusibleComponents/Spinner';
import Loading from 'react-loading';

import { Animated } from 'react-animated-css';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import unFormValidator from '../ResusibleComponents/Fields/contains/funcs';
import { useState } from 'react';
import { useRef } from 'react';
import { useAuth } from '../../contexts/auth';
import iService from '../../services/service';
import { toast } from 'react-toastify';

// core components

function Authentication(props) {
  const formRef = useRef(null);

  const [action, setAction] = useState('');
  const [papel, setPapel] = useState('');
  const [password, setPassword] = useState('');
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [isSignInScreen, setIsSignInScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, resetPassword } = useAuth();

  const options = [
    {
      name: 'Candidato',
      icon: 'candidato.png',
      margign: 'mr-3',
      margignL: '60px',
    },
    { name: 'Seguradora', icon: 'empregador.png', margign: 'ml-3' },
  ];
  let checker = 'login';
  let Ischema = null;

  //   state = {
  //     action: '',
  //     papel: '',
  //     password: {},
  //     username: {},
  //     login: {
  //       username: '',
  //       password: '',
  //     },
  //   };

  function registerFields() {
    return (
      <Col md="12">
        <Animated
          animationIn="jackInTheBox"
          animationOut="fadeOutUp"
          animationInDuration={2300}
          animationOutDuration={1000}
          isVisible={true}
        >
          <Row>
            <Col md="12">
              <div className="card-title  mt-4 fw-mediumbold">
                Registrar {papel}
                <div className="float-right">
                  <i
                    className="flaticon-back c-pointer --theme-hover"
                    onClick={(e) => {
                      setPapel('');
                    }}
                  ></i>{' '}
                </div>
              </div>
            </Col>
            <Col md="6">
              <Field
                label="Denominação"
                type="text"
                fieldtype="input"
                name="Designacao"
              />
            </Col>
            <Col md="6">
              <Field label="NIF" type="text" fieldtype="input" name="Nif" />
            </Col>

            <Col md="6">
              <Field
                label="Telefone"
                type="text"
                fieldtype="input"
                name="Telefone"
              />
            </Col>
            <Col md="6">
              <Field
                label="Email"
                type="email"
                fieldtype="input"
                name="Email"
              />
            </Col>
            <Col md="6">
              <Field
                label="Nome de Usúario"
                type="text"
                fieldtype="input"
                name="UserName"
              />
            </Col>
            <Col md="6">
              <Field
                label="Data Criação"
                type="date"
                fieldtype="input"
                name="DataCriacao"
              />
            </Col>
            <Col md="6">
              <Field
                label="Senha"
                type="password"
                fieldtype="input"
                name="Has_PassWord"
              />
            </Col>
            <Col md="6">
              <Field
                label="Confirmar Senha"
                type="password"
                fieldtype="input"
                name="Has_PassWord"
              />
            </Col>

            <Col xl="12 p-2">
              <Button
                onClick={() => {
                  formRef.current.submitForm();
                }}
                className="ml-2 btn-primary"
              >
                Registrar
              </Button>
            </Col>
          </Row>
        </Animated>
      </Col>
    );
  }

  function registerOptions() {
    return (
      <Fragment>
        <Col md="12"> </Col>
        <Col md="12">
          <Animated
            animationIn="fadeInUp"
            animationOut="fadeOutUp"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <div
              className="card-title  mt-4 fw-mediumbold"
              style={{ marginLeft: '57px' }}
            >
              Escolha uma Opção
            </div>
            <div className="c-flex" style={{ marginTop: '60px' }}>
              {options.map((o, i) => {
                return (
                  <div
                    key={i}
                    className={`card  c-pointer --b-color-theme orange c-hover card-round ${o.margign}`}
                    style={{ marginLeft: o.margignL }}
                    title={o.name.toUpperCase()}
                    onClick={(e) => {
                      setPapel(o.name);
                    }}
                  >
                    <div className="card-body">
                      <div className="avatar avatar-xxl max">
                        <img
                          className="avatar-img"
                          src={`./img/${o.icon}`}
                          alt={o.name}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Animated>
        </Col>
      </Fragment>
    );
  }

  function register() {
    checker = 'register';
    return (
      <Row className="ml-3 mr-3">
        {papel === 'Seguradora'
          ? registerFields()
          : papel === 'Candidato'
          ? registerOptions()
          : registerOptions()}
      </Row>
    );
  }

  function login() {
    checker = 'login';
    return (
      <Animated
        animationIn="jackInTheBox"
        animationOut="fadeOutUp"
        animationInDuration={2300}
        animationOutDuration={1000}
        isVisible={true}
      >
        <Row className="ml-3 mr-3">
          {/* <Spinner/> */}
          <Col md="12 login-center">
            <div
              className="card-title  mt-4 fw-mediumbold"
              style={{ marginLeft: '106px', marginTop: '60px' }}
            >
              Login
            </div>
          </Col>
          <Col md="12">
            {isSignInScreen ? (
              <>
                <Row style={{ marginTop: '60px' }}>
                  <Col md="8 login-center">
                    {}
                    <Field
                      label="E-mail / Nome de Usuário"
                      type="text"
                      fieldtype="input"
                      name="UserName"
                      onChange={({ target }) => {
                        setUserNameOrEmail(target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="8 login-center">
                    <Field
                      label="Senha"
                      type="password"
                      fieldtype="input"
                      name="PassWord"
                      onChange={({ target }) => {
                        setPassword(target.value);
                      }}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row style={{ marginTop: '60px' }}>
                  <Col md="8 login-center">
                    <Field
                      label="Nome Completo"
                      type="text"
                      fieldtype="input"
                      name="NomeCompleto"
                      onChange={({ target }) => {
                        setNomeCompleto(target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="8 login-center">
                    <Field
                      label="Email"
                      type="Email"
                      fieldtype="input"
                      name="Email"
                      onChange={({ target }) => {
                        setUserNameOrEmail(target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="8 login-center">
                    <Field
                      label="Password"
                      type="password"
                      fieldtype="input"
                      name="Has_PassWord"
                      onChange={({ target }) => {
                        setPassword(target.value);
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
            <Row>
              <Col md="8 login-center">
                <div
                  style={{ marginTop: '20px' }}
                  onClick={() => {
                    formRef.current.submitForm();
                  }}
                >
                  <div className="anchor-button">
                    <span>
                      {isLoading ? (
                        <Loading type={'spin'} width={18} height={18} />
                      ) : (
                        <i
                          className={
                            isSignInScreen
                              ? 'flaticon-arrow'
                              : 'flaticon-add-user'
                          }
                        ></i>
                      )}

                      {/* */}
                    </span>
                    <strong>
                      {isLoading
                        ? 'Verificando...'
                        : isSignInScreen
                        ? 'Entrar na app'
                        : 'Inscreva-se'}
                    </strong>
                  </div>
                </div>
              </Col>
              <Col
                md="8 p-0 login-center button-actions"
                className={isSignInScreen ? ' mt-5' : ''}
              >
                <span
                  onClick={() => {
                    setIsSignInScreen(!isSignInScreen);
                  }}
                  style={!isSignInScreen ? { margin: '0' } : {}}
                >
                  <i
                    className={
                      isSignInScreen ? 'flaticon-add-user' : 'flaticon-arrow'
                    }
                  ></i>
                </span>
                {isSignInScreen ? (
                  <span>
                    <i className="flaticon-repeat"></i>
                  </span>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Animated>
    );
  }

  async function handleSubmit(data, { reset }) {
    setIsLoading(true);
    if (checker === 'login') {
      if (isSignInScreen)
        data = { UserName: userNameOrEmail, PassWord: password };
      else {
        data = {
          Has_PassWord: password,
          Nome: nomeCompleto.split(' ')[0],
          SobreNome: nomeCompleto.split(' ')[1],
          NomeCompleto: nomeCompleto,
          Email: userNameOrEmail,
        };
        return onRegistry({ data, reset });
      }

      return onLogin({ data, reset });
    } else if (checker === 'register') {
      return onRegistry({ data, reset });
    }else if(checker === "forgetPassword"){
      data = { UserName: userNameOrEmail, PassWord: password };
      return onResetPassword({ data, reset });
    }
  }

  async function onRegistry({ data, reset }) {
    let label = 'Empresa';
    console.log(data)
    return
  }

  async function onLogin({ data, reset }) {
    Ischema = {
      UserName: Yup.string().required('E-mail é obrigatória...'),
      PassWord: Yup.string().required('A palavra passe é obrigatória...'),
    };

    const isValid = await unFormValidator(formRef, { data }, Ischema);
    if (!isValid.success) {
      setIsLoading(false);
      return toast.warning('Os dados estão incorrectos...');
    }

    if (window.location.pathname.toLocaleLowerCase() === '/mobile-root')
      data.Provider = 0;
    else data.Provider = 1;

    signIn(data, setIsLoading, reset);
  }

  async function onResetPassword({ data, reset}){
    Ischema = {
      UserName: Yup.string().required('E-mail é obrigatória...'),
      PassWord: Yup.string().required('A palavra passe é obrigatória...'),
    };

    const isValid = await unFormValidator(formRef, { data }, Ischema);
    if (!isValid.success) {
      setIsLoading(false);
      return toast.warning('Os dados estão incorrectos...');
    }

    resetPassword(data, setIsLoading, reset);
    
  }

  function forgetPassword() {
    checker = 'forgetPassword';
    return (
      <Animated
        animationIn="jackInTheBox"
        animationOut="fadeOutUp"
        animationInDuration={2300}
        animationOutDuration={1000}
        isVisible={true}
      >
        <Row className="ml-3 mr-3">
          {/* <Spinner/> */}
          <Col md="12 login-center">
            <div
              className="card-title  mt-4 fw-mediumbold"
              style={{ marginLeft: '106px', marginTop: '60px' }}
            >
              Recuperar a senha
            </div>
          </Col>
          <Col md="12">
            {isSignInScreen ? (
              <>
                <Row style={{ marginTop: '60px' }}>
                  <Col md="8 login-center">
                    {}
                    <Field
                      label="E-mail / Nome de Usuário"
                      type="text"
                      fieldtype="input"
                      name="UserName"
                      onChange={({ target }) => {
                        setUserNameOrEmail(target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="8 login-center">
                    <Field
                      label="Senha"
                      type="password"
                      fieldtype="input"
                      name="PassWord"
                      onChange={({ target }) => {
                        setPassword(target.value);
                      }}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row style={{ marginTop: '60px' }}>
                  <Col md="8 login-center">
                    <Field
                      label="Nome Completo"
                      type="text"
                      fieldtype="input"
                      name="NomeCompleto"
                      onChange={({ target }) => {
                        setNomeCompleto(target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="8 login-center">
                    <Field
                      label="Email"
                      type="Email"
                      fieldtype="input"
                      name="Email"
                      onChange={({ target }) => {
                        setUserNameOrEmail(target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="8 login-center">
                    <Field
                      label="Password"
                      type="password"
                      fieldtype="input"
                      name="Has_PassWord"
                      onChange={({ target }) => {
                        setPassword(target.value);
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
            <Row>
              <Col md="8 login-center">
                <div
                  style={{ marginTop: '20px' }}
                  onClick={() => {
                    formRef.current.submitForm();
                  }}
                >
                  <div className="anchor-button">
                    <span>
                      {isLoading ? (
                        <Loading type={'spin'} width={18} height={18} />
                      ) : (
                        <i
                          className={
                            isSignInScreen
                              ? 'flaticon-arrow'
                              : 'flaticon-add-user'
                          }
                        ></i>
                      )}

                      {/* */}
                    </span>
                    <strong>
                      {isLoading
                        ? 'Verificando...'
                        : isSignInScreen
                        ? 'Recuperar'
                        : 'Inscreva-se'}
                    </strong>
                  </div>
                </div>
              </Col>
              <Col
                md="8 p-0 login-center button-actions"
                className={isSignInScreen ? ' mt-5' : ''}
              >
                <span
                  onClick={() => {
                    setIsSignInScreen(!isSignInScreen);
                  }}
                  style={!isSignInScreen ? { margin: '0' } : {}}
                >
                  <i
                    className={
                      isSignInScreen ? 'flaticon-add-user' : 'flaticon-arrow'
                    }
                  ></i>
                </span>
                {isSignInScreen ? (
                  <span>
                    <i className="flaticon-repeat"></i>
                  </span>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Animated>
    );
  }
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <div className="justify-content-center container-flexible ">
              <div className="clips-container  bg-">
                <div className="profile-picture">
                  <div
                    className="avatar avatar-xl"
                    style={{
                      display: 'flex',
                      margin: ' 0 auto',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src="./img/jobsNoBackGround.png"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                </div>
                {/* <img className="card-img-top" src="./img/jobs.png" alt="Card" /> */}
                <div className="form-fields">
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    {action === 'forget'
                      ? forgetPassword()
                      : action === 'registe'
                      ? register()
                      : login()}
                  </Form>
                </div>
              </div>
              <Card
                className="p-0 m-0 clip-desktop"
                style={{
                  top: '50%',
                  transform: ' translateY(23%)',
                  height: '450px',
                  position: 'absolute',
                  width: ' 100%',
                }}
              >
                <CardBody className="p-0 m-0">
                  <Row className="p-0 " style={{ marginLeft: '0px' }}>
                    <Col
                      md="4 bg-"
                      style={{
                        position: 'relative',
                        borderBottomLeftRadius: '5px',
                        borderTopLeftRadius: '5px',
                      }}
                    >
                      <div style={{ height: '450px', borderRadius: '5px' }}>
                        <div className="profile-picture">
                          <div
                            className="avatar avatar-xl"
                            style={{ display: 'flex', margin: ' 0 auto' }}
                          >
                            <img
                              src="./img/jobsNoBackGround.png"
                              alt="..."
                              className="avatar-img rounded-circle"
                            />
                          </div>
                        </div>
                        {/* <img className="card-img-top" src="./img/jobs.png" alt="Card" /> */}
                        <div className="clips">
                          <img
                            className="card-img-top"
                            src="./img/Kubernetes.png"
                            alt="Card"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="8" className="pl-0">
                      <div className="form-flex">
                        <div className="form-type">
                          <div
                            className="icon-action "
                            onClick={(e) => {
                              setAction('login');
                              document
                                .querySelectorAll('.icon-big')
                                .forEach((i) => {
                                  i.classList.remove('active');
                                });
                              document
                                .querySelector('.login')
                                .classList.add('active');
                            }}
                          >
                            <div className="icon-big active login text-center">
                              <i className="icon-lock-open"></i>
                              <p>Login</p>
                              <div className="hover"></div>
                            </div>
                          </div>
                          <div
                            className="icon-action"
                            onClick={(e) => {
                              setAction('registe');
                              document
                                .querySelectorAll('.icon-big')
                                .forEach((i) => {
                                  i.classList.remove('active');
                                });
                              document
                                .querySelector('.registe')
                                .classList.add('active');
                            }}
                          >
                            <div className="icon-big registe text-center">
                              <i className="flaticon-profile"></i>
                              <p>Register</p>
                              <div className="hover"></div>
                            </div>
                          </div>
                          <div
                            className="icon-action"
                            onClick={(e) => {
                              setAction('forget');
                              document
                                .querySelectorAll('.icon-big')
                                .forEach((i) => {
                                  i.classList.remove('active');
                                });
                              document
                                .querySelector('.forget')
                                .classList.add('active');
                            }}
                          >
                            <div className="icon-big forget text-center">
                              <i className="flaticon-lock-1"></i>
                              <p>Forget Password</p>
                              <div className="hover"></div>
                            </div>
                          </div>
                        </div>
                        <div className="form-fields">
                          <Form ref={formRef} onSubmit={handleSubmit}>
                            {action === 'forget'
                              ? forgetPassword()
                              : action === 'registe'
                              ? register()
                              : login()}
                          </Form>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Authentication;
