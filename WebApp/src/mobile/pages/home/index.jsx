import React, { useCallback, useState, useEffect } from 'react';
import { useMobileApp } from '../../contexts/app';
import { Animated } from 'react-animated-css';

import iService from '../../../services/service';
import { isEmpty } from '../../../helpers';
import { Alert, Container } from 'reactstrap';
// import { Container } from './styles';

const MobileHomeScreen = () => {
  const {
    appCurrentStack,
    activeScreen,
    setActiveScreen,
    startAnimation,
    setAppCurrentStack,
    screenStack,
  } = useMobileApp();
  const [oportunitiesAvailable, setOportunitiesAvailable] = useState([]);

  useEffect(() => {
    iService
      .fetch({
        table: 'vagasDisponiveis',
        properties: ` Id
        Detalhes
        NumVagas
        Cidade
        Empresa{Designacao}
        TipoFuncao {Designacao}
        `,
      })
      .then(async (res) => {
        if (!res.ok) return console.error(res.errors);
        const { data } = res;
        setOportunitiesAvailable(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOportunityClicked = (oportunity) => {
    localStorage.setItem('@:oportunidadeId', oportunity);
    setActiveScreen('Details');
    setAppCurrentStack([
      ...appCurrentStack,
      { parent: 'mobile-home', backScreen: true },
    ]);
  };

  const renderOportunities = useCallback(() => {
    if (isEmpty(oportunitiesAvailable))
      return (
        <Container>
          <Alert>Nenhuma oportunidade encontrada</Alert>
        </Container>
      );
    return oportunitiesAvailable.map(
      ({ TipoFuncao, NumVagas, Cidade, Empresa, Id }, index) => {
        return (
          <div
            className="col-sm-6 col-md-6"
            key={Math.random() + Math.random() + index}
            onClick={() => handleOportunityClicked(Id)}
          >
            <div className="card card-stats card-round">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-left">
                      <i
                        style={{ color: '#1a2035' }}
                        className={`flaticon-interface-6`}
                      ></i>
                    </div>
                  </div>
                  <div className="col-7 col-stats">
                    <div className="numbers">
                      <p className="card-category">{TipoFuncao?.Designacao}</p>
                      <div style={{ display: 'flex' }}>
                        <span style={{ color: '#333', marginRight: '2px' }}>
                          {Cidade},
                        </span>
                        <span style={{ color: '#333', marginLeft: '2px' }}>
                          {NumVagas + ' Vagas'}
                        </span>
                      </div>
                      <p className="card-category">
                        Org:{' '}
                        {isEmpty(Empresa) || isEmpty(Empresa?.Designacao)
                          ? 'Anónimo'
                          : Empresa?.Designacao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    );
  }, [oportunitiesAvailable]);

  return activeScreen !== '' ? (
    screenStack.home
      .filter((screen) => screen.name === activeScreen)
      .map((screen) => (
        <Animated
          style={{ height: '100%' }}
          key={Math.random()}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          animationInDuration={700}
          animationOutDuration={700}
          isVisible={startAnimation}
        >
          {screen.components}
        </Animated>
      ))
  ) : (
    <>
      <div>
        <i
          className="flaticon-stopwatch"
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
            width: '100%',
            transform: 'translateX(-25%)',
          }}
        >
          Vagas disponíveis
        </span>
      </div>
      {renderOportunities()}
    </>
  );
};

export default MobileHomeScreen;
