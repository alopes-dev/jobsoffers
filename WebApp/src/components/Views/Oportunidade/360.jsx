import React, { useState, useEffect } from 'react';
import { Row, Card, Col, CardHeader, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Candidatotos,
  Candidatoto,
  Name,
  ActionsButton,
  Button,
} from './style';

import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from '../../../helpers';
import { setOportunidadeId } from '../../../store/actions/oportunidade';
import { moreInformation, approveCandidato } from '../../../store/funcs/fetch';
import OportunityDetails from './OportunityDetails';
import HistoricoOportunidade from './historicoDaOportuindade';
import history from '../../../history';

export default function VOp360() {
  const [state, setstate] = useState({
    options: {
      chart: {
        height: 450,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#37d6ab', 'rgb(89, 104, 226)', '#ffad46', '#48abf7'],
      stroke: {
        show: true,
        width: 9,
        colors: ['transparent'],
      },

      xaxis: {
        categories: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
      },
      yaxis: {
        title: {
          text: 'Rendimento Mensal',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return ' ' + val + ' Candidatos';
          },
        },
      },
    },
    series: [
      {
        name: 'Selecionados',
        data: [],
      },
      {
        name: 'Inscritos',
        data: [],
      },
      {
        name: 'Recusados',
        data: [],
      },
      {
        name: 'Free Cash Flow',
        data: [],
      },
    ],
  });
  const [Oportunidade, setOportunidade] = useState({});

  const [approvedCandidato, setApprovedCandidato] = useState([]);
  const [rejectedCandidato, setRejectedCandidato] = useState([]);

  const { Candidaturas, IsFinalizado } = Oportunidade || {};

  const dispatch = useDispatch();
  const oportunidadeId = useSelector(
    (state) => state.oportunidade.oportunidadeId
  );

  async function loadingInformations() {
    const response = await moreInformation(oportunidadeId);
    if (response.ok) setOportunidade(response.data);
  }

  useEffect(() => {
    loadingInformations();

    if (isEmpty(oportunidadeId)) {
      const id = localStorage.getItem('@oportunidadeId');
      dispatch(setOportunidadeId({ Id: JSON.parse(id) }));
    }
  }, [oportunidadeId]);

  useEffect(() => {
    setApprovedCandidato(
      Candidaturas?.filter(({ IsAnalizado }) => IsAnalizado === 1) || []
    );
    setRejectedCandidato(
      Candidaturas?.filter(({ IsAnalizado }) => IsAnalizado === -1) || []
    );

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const series = [
      {
        name: 'Selecionados',
        data: [],
      },
      {
        name: 'Inscritos',
        data: [],
      },
      {
        name: 'Recusados',
        data: [],
      },
    ];

    const selecionadosOrExcluido = [],
      inscritos = [];

    months.forEach((month) => {
      return Candidaturas?.forEach((canditatura) => {
        if (month === canditatura.createdAt.split('-')[1] * 1) {
          inscritos.push(canditatura);
        }

        if (month === canditatura.updatedAt.split('-')[1] * 1) {
          selecionadosOrExcluido.push(canditatura);
        }
      });
    });

    const selecionados = selecionadosOrExcluido.filter(
      ({ IsAnalizado }) => IsAnalizado === 1
    );

    const excluido = selecionadosOrExcluido.filter(
      ({ IsAnalizado }) => IsAnalizado === -1
    );

    series[0].data = analitics(selecionados, months, 'updatedAt');
    series[1].data = analitics(inscritos, months, 'createdAt');
    series[2].data = analitics(excluido, months, 'updatedAt');

    setstate({ ...state, series });
  }, [Candidaturas]);

  function analitics(candidatos = [], months, selector) {
    const series = [];

    let amostras = [];
    months.forEach((month) => {
      let counter = 0;
      candidatos.forEach((candidato) => {
        if (month === candidato[selector].split('-')[1] * 1) {
          counter++;
        }
      });
      amostras.push(counter);
    });

    amostras.forEach((amostra) => {
      series.push(amostra);
    });

    return series;
  }

  async function handleApprove({ CandidatoId, Id, IsAnalizado }) {
    const data = await approveCandidato({
      CandidatoId,
      Id,
      IsAnalizado,
    });

    if (data.IsAnalizado) loadingInformations();
  }

  return (
    <div>
      <Row>
        <Col xl="12">
          <div
            className="avatar-sm avatar-position"
            title={IsFinalizado != 0 ? 'Activar' : 'Cancelar'}
          >
            <span
              className={`avatar-title rounded-circle border border-white bg-${
                IsFinalizado != 0 ? 'disabled' : 'success'
              }`}
            >
              {IsFinalizado != 0 ? 'Off' : 'On'}
            </span>
          </div>
        </Col>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round no-padding">
            <div className="card-body">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center">
                    <i className="flaticon-users text-primary"></i>
                  </div>
                </div>
                <div className="col-7 col-stats">
                  <div className="numbers">
                    <p className="card-category"> Inscritos</p>
                    <h4 className="card-title">{Candidaturas?.length || 0}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round no-padding">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center">
                    <i className="flaticon-chart-pie text-warning"></i>
                  </div>
                </div>
                <div className="col-7 col-stats">
                  <div className="numbers">
                    <p className="card-category">Número de Vagas</p>
                    <h4 className="card-title">
                      {Oportunidade?.NumVagas || 0}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round no-padding">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center">
                    <i className="flaticon-hands text-success"></i>
                  </div>
                </div>
                <div className="col-7 col-stats">
                  <div className="numbers">
                    <p className="card-category">Selecionados</p>
                    <h4 className="card-title">{approvedCandidato.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round no-padding">
            <div className="card-body">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center">
                    <i className="flaticon-error text-danger"></i>
                  </div>
                </div>
                <div className="col-7 col-stats">
                  <div className="numbers">
                    <p className="card-category">Recusados</p>
                    <h4 className="card-title">{rejectedCandidato.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>

      <Row>
        <Col xl="6" sm="6" md="3">
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="100%"
                background="#f4f4f4"
                forecolor="#333"
              />
            </CardBody>
          </Card>
        </Col>
        <Col xl="6" sm="6" md="3">
          <Card>
            <CardHeader>
              <div className="cardTitle">Candidatos a vaga</div>
            </CardHeader>
            <CardBody>
              <Candidatotos>
                <PerfectScrollbar>
                  {Candidaturas?.map(
                    ({ Candidato, IsAnalizado, ...rest }, i) => {
                      return IsAnalizado !== -1 ? (
                        <Candidatoto key={i}>
                          {Candidato.Foto ? (
                            <div className="avatar avatar-online">
                              <img
                                src="./img/profile.jpg"
                                alt="...i"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          ) : (
                            <div className="avatar avatar-online">
                              <span className="avatar-title rounded-circle border border-white bg-info">
                                {Candidato.Nome.charAt(0)}
                                {Candidato.SobreNome.charAt(0)}
                              </span>
                            </div>
                          )}

                          <Name>{`${Candidato.Nome} ${Candidato.SobreNome} `}</Name>
                          <ActionsButton>
                            {IsAnalizado === 0 ? (
                              <>
                                <Button
                                  onClick={() => {
                                    handleApprove({
                                      Id: rest.Id,
                                      CandidatoId: rest.CandidatoId,
                                      IsAnalizado: 1,
                                    });
                                  }}
                                >
                                  <i className="icon-pin" />
                                  Aprovar
                                </Button>
                                |
                              </>
                            ) : (
                              <></>
                            )}

                            <Button
                              onClick={(e) => {
                                localStorage.setItem(
                                  '@Candidatura',
                                  JSON.stringify({
                                    CandidatoId: rest.CandidatoId,
                                    CandidaturaId: rest.Id,
                                  })
                                );

                                history.push(`/curriculum-viewer`);
                              }}
                            >
                              <i className="flaticon-file" />
                              Curriculum
                            </Button>
                            {IsAnalizado === 0 ? (
                              <>
                                |
                                <Button
                                  onClick={() => {
                                    handleApprove({
                                      Id: rest.Id,
                                      CandidatoId: rest.CandidatoId,
                                      IsAnalizado: -1,
                                    });
                                  }}
                                >
                                  <i className="flaticon-cross" />
                                  Rejeitar
                                </Button>
                              </>
                            ) : (
                              <></>
                            )}
                          </ActionsButton>
                        </Candidatoto>
                      ) : (
                        <React.Fragment key={i}></React.Fragment>
                      );
                    }
                  )}
                </PerfectScrollbar>
              </Candidatotos>
            </CardBody>
          </Card>
        </Col>
        <OportunityDetails {...Oportunidade} />
        <HistoricoOportunidade historics={Candidaturas} />
      </Row>
    </div>
  );
}
