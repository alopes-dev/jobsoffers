import React, { Fragment, useEffect } from 'react';
// nodejs library that concatenates classes
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from 'reactstrap';
import Field from '../ResusibleComponents/Fields/Field';
import { isEmpty } from '../../helpers';
import Spinner from '../ResusibleComponents/Spinner';

import { Animated } from 'react-animated-css';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import unFormValidator from '../ResusibleComponents/Fields/contains/funcs';
import { useState } from 'react';
import { useRef } from 'react';
import { useAuth } from '../../contexts/auth';
// core components

function Authentication(props) {
  const formRef = useRef(null);

  const [action, setAction] = useState('');
  const [papel, setPapel] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const options = [
    {
      name: 'Candidato',
      icon: 'candidato.png',
      margign: 'mr-3',
      margignL: '60px',
    },
    { name: 'Empregador', icon: 'empregador.png', margign: 'ml-3' },
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

  useEffect(() => {
    fetch('http://localhost:5500/api/estados').then(async (e) => {
      let dat = await e.json();
    });
  });

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
                label="Nome"
                type="text"
                fieldtype="input"
                name="emai"
                msm={{
                  text: 'Email inválido...',
                  type: 'WARNING',
                  show: false,
                }}
              />
            </Col>
            <Col md="6">
              <Field
                label="Username"
                type="text"
                fieldtype="input"
                name="emai"
                msm={{
                  text: 'Email inválido...',
                  type: 'WARNING',
                  show: false,
                }}
              />
            </Col>
            <Col md="6">
              <Field
                label="E-mail"
                type="text"
                fieldtype="input"
                name="emai"
                msm={{
                  text: 'Email inválido...',
                  type: 'WARNING',
                  show: false,
                }}
              />
            </Col>
            <Col md="6">
              <Field
                label="E-mail Alternativo"
                type="text"
                fieldtype="input"
                name="emai"
                msm={{
                  text: 'Email inválido...',
                  type: 'WARNING',
                  show: false,
                }}
              />
            </Col>
            <Col md="6">
              <Field
                label="Senha"
                type="password"
                fieldtype="input"
                name="emai"
                msm={{
                  text: 'Email inválido...',
                  type: 'WARNING',
                  show: false,
                }}
              />
            </Col>
            <Col md="6">
              <Field
                label="Confirmar Senha"
                type="password"
                fieldtype="input"
                name="emai"
                msm={{
                  text: 'Email inválido...',
                  type: 'WARNING',
                  show: false,
                }}
              />
            </Col>
            <Col md="6">
              <div className="form-group mb-2 p-0">
                <label>Captcha Code</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Hjq23YSH
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <div
                    className="input-group-append"
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="input-group-text">
                      <i className="flaticon-repeat"></i>{' '}
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col xl="12 p-2">
              <Button className="ml-2 btn-primary">Registrar</Button>
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
              {options.map((o) => {
                return (
                  <div
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
        {papel === 'Candidato'
          ? registerFields()
          : papel === 'Empregador'
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
              style={{ marginLeft: '106px' }}
            >
              Login
            </div>
          </Col>
          <Col md="12">
            <Row style={{ marginTop: '60px' }}>
              <Col md="8 login-center">
                <Field
                  label="Email / Username"
                  type="text"
                  fieldtype="input"
                  name="UserName"
                />
              </Col>
            </Row>
            <Row>
              <Col md="8 login-center">
                <Field
                  label="Password"
                  type="password"
                  fieldtype="input"
                  name="PassWord"
                  msm={password}
                />
              </Col>
              <Col xl="12 p-2 ">
                <div style={{ marginLeft: '106px', marginTop: '20px' }}>
                  <Button className="ml-2 btn-primary" type="submit">
                    {' '}
                    Entrar{' '}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Animated>
    );
  }

  function refresh(e) {
    // e.target.parentElement.classList.remove('has-error')
    // e.target.parentElement.querySelector('small').classList.remove('text-danger')
    // e.target.parentElement.querySelector('small').innerHTML = ''
  }

  async function handleSubmit(data, { reset }) {
    if (checker === 'login') {
      return onLogin({ data, reset });
    }
  }

  async function onLogin({ data, reset }) {
    Ischema = {
      UserName: Yup.string().required('E-mail é obrigatória...'),
      PassWord: Yup.string().required('A palavra passe é obrigatória...'),
    };

    const isValid = await unFormValidator(formRef, { data, reset }, Ischema);

    if (isValid.success) {
      await signIn(data);
    }
  }

  function forgetPassword() {}
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <div className="justify-content-center ">
              <Card
                className="p-0 m-0"
                style={{
                  top: '50%',
                  transform: ' translateY(23%)',
                  height: '450px',
                  position: 'absolute',
                  width: ' 100%',
                }}
              >
                <CardBody className="p-0 m-0">
                  <Row className="p-0" style={{ marginLeft: '0px' }}>
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
