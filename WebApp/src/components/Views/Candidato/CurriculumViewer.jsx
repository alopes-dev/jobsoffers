import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import Field from '../../ResusibleComponents/Fields/Field';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Skeleton from 'react-loading-skeleton';
import {
  Header,
  SubHeader,
  Title,
  SubTitle,
  DetailsContent,
  Icon,
  ItemContainer,
  ItemValue,
  ItemTitle,
  ItemTitleSmall,
  ItemDescription,
  Item,
  Small,
  ItemValueAsEmail,
  ActionsButton,
  Button,
  ItemSingle,
} from './style';

import { Form } from '@unform/web';
import unFormValidator from '../../ResusibleComponents/Fields/contains/funcs';
import * as Yup from 'yup';

import iservice from '../../../services/service';
import { CurriculumSchema, CandidaturaCurriculo } from './schemas/curriculo';
import formatValue from '../../../formatValue';
import { toast } from 'react-toastify';
import { approveCandidato } from '../../../store/funcs/fetch';
import { isEmpty } from '../../../helpers';

export default function CurriculumViewer(props) {
  const [curriculo, setCurriculo] = useState({});
  const [dadosPessoas, setPadosPessoas] = useState({});
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [morada, setMorada] = useState(undefined);
  const [dataNascimento, setDataNascimento] = useState(undefined);
  const [pessoaIdiomas, setPessoaIdiomas] = useState([]);
  const [candidaturaCurriculo, setCandidaturaCurriculo] = useState([]);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [reload, setReload] = useState(null);
  const [detalhe, setDetalhe] = useState('');

  const { CandidatoId, CandidaturaId } = JSON.parse(
    localStorage.getItem('@Candidatura')
  );

  const { EmpresaId } = JSON.parse(localStorage.getItem('@jobs:user'));

  const [modal, setModal] = useState(false);
  const formRef = useRef(null);

  const toggle = () => setModal(!modal);

  async function loadData() {
    const response = await iservice.fetch({
      getById: {
        value: CandidatoId,
        field: 'Id',
        consts: 'CandidatoId',
      },
      table: 'Curriculo',
      properties: CurriculumSchema,
    });
    if (response.ok) setCurriculo(response.data);

    const TipoDocumentos = await iservice.fetch({
      table: 'TipoDocumentos',
      properties: 'Id Designacao',
    });

    if (TipoDocumentos.ok)
      setTipoDocumentos(
        TipoDocumentos.data.map((item) => {
          return {
            value: item.Id,
            label: item.Designacao,
          };
        })
      );
  }

  async function loadOthersCandidaturas() {
    const response = await iservice.fetch({
      getById: {
        value: CandidatoId,
        field: 'Id',
        consts: 'CandidatoId',
      },
      table: 'Candidatura',
      properties: CandidaturaCurriculo,
    });

    const canditaturaFiltered = response.data?.filter(
      ({ Oportunidade, Id }) =>
        Oportunidade.EmpresaId === EmpresaId && Id !== CandidaturaId
    );

    if (response.ok) setCandidaturaCurriculo(canditaturaFiltered);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadOthersCandidaturas();
  }, [reload]);

  useEffect(() => {
    const { Candidato } = curriculo || {};
    if (Candidato) {
      const {
        Nome,
        SobreNome,
        PessoaContacto,
        Morada,
        DataNascimento,
        PessoaIdiomas,
      } = Candidato;
      const { Contacto } = PessoaContacto[0];

      setMorada(Morada);
      setDataNascimento(DataNascimento);
      setNomeCompleto(`${Nome} ${SobreNome}`);
      setPadosPessoas(Contacto);
      setPessoaIdiomas(PessoaIdiomas);
    }
  }, [curriculo]);

  function formatDate(date) {
    date = new Date(date).toDateString().split(' ');

    return date[1] + ' ' + date[3];
  }

  async function handleApprove({ CandidatoId, Id, IsAnalizado }) {
    await approveCandidato({
      CandidatoId,
      Id,
      IsAnalizado,
    });

    setReload(Math.random());
  }

  function curriculoDetalhes() {
    let Collection = {
        experience: { desc: '', values: [] },
        ademica: { desc: '', values: [] },
        course: { desc: '', values: [] },
        extraCurricular: { desc: '', values: [] },
      },
      Collections = [];

    const { CurriculoDetalhes } = curriculo || {};

    if (CurriculoDetalhes) {
      const _ = CurriculoDetalhes?.forEach(({ Detalhe }) => {
        const { Designacao, tipoIcon } = Detalhe?.TipoDetalhe;
        if (Designacao === 'Experiência Profissional') {
          Collection.experience.values.push(Detalhe);
          Collection.experience.tipoIcon = tipoIcon;
          Collection.experience.desc = Designacao;
        }
        if (Designacao === 'Cursos') {
          Collection.course.values.push(Detalhe);
          Collection.course.tipoIcon = tipoIcon;
          Collection.course.desc = Designacao;
        }
        if (Designacao === 'Formação Académica') {
          Collection.ademica.values.push(Detalhe);
          Collection.ademica.tipoIcon = tipoIcon;
          Collection.ademica.desc = Designacao;
        }
        if (Designacao === 'Atividade Extra-Curricular') {
          Collection.extraCurricular.values.push(Detalhe);
          Collection.extraCurricular.tipoIcon = tipoIcon;
          Collection.extraCurricular.desc = Designacao;
        }
      });

      Collections = [
        { ...Collection.experience },
        { ...Collection.course },
        { ...Collection.ademica },
        { ...Collection.extraCurricular },
      ];
      Collections = Collections.filter(({ values }) => values.length !== 0);
    }
    return Collections.map(({ desc, tipoIcon, values }, index) => {
      return (
        <DetailsContent key={index}>
          <ItemSingle>
            <Icon>
              <i className={tipoIcon}></i>
            </Icon>
            <ItemContainer>
              <Item>
                <ItemTitle>{desc}</ItemTitle>
                {values.map((val, i) => {
                  return (
                    <React.Fragment key={i}>
                      <ItemTitleSmall>
                        {val?.Designacao +
                          ' em ' +
                          val?.NomeDaInstituicao +
                          ' , ' +
                          val?.LocalDaInstituicao}
                        <small className="text-muted ">
                          {formatDate(val?.DataInicio) +
                            ' - ' +
                            formatDate(val?.DataFim)}
                        </small>
                      </ItemTitleSmall>
                      <ItemDescription>
                        {val?.DescricaoDaInstituicao || <Skeleton />}
                      </ItemDescription>
                    </React.Fragment>
                  );
                })}
              </Item>
            </ItemContainer>
          </ItemSingle>
        </DetailsContent>
      );
    });
  }

  function curriculoSkills() {
    const { CurriculoSkills } = curriculo || {};

    return CurriculoSkills?.map(({ Id, Skills }) => {
      return (
        <React.Fragment key={Id}>
          <ItemValue>
            {Skills.Designacao} <Small>{Skills.Percentagem}%</Small>
          </ItemValue>
          <div className="progress progress-sm">
            <div
              className={`progress-bar bg-secondary`}
              role="progressbar"
              style={{ width: `${Skills.Percentagem}%` }}
              aria-valuenow={Skills.Percentagem}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </React.Fragment>
      );
    });
  }

  function curriculoHobes() {
    const { CurriculoHobes } = curriculo || {};

    return CurriculoHobes?.map(({ Id, Hobes }) => {
      return (
        <React.Fragment key={Id}>
          <ItemValue>{'    - ' + Hobes.Designacao}</ItemValue>
          <ItemDescription style={{ paddingLeft: '15px' }}>
            {'            ' + Hobes.Designacao}
          </ItemDescription>
        </React.Fragment>
      );
    });
  }

  function curriculoCandidaturas() {
    if (isEmpty(candidaturaCurriculo))
      return (
        <div className="card card-pricing">
          <div className="card-header">
            <h4
              className="card-title text-warning"
              style={{ fontSize: '18px' }}
            >
              Nenhuma candidatura relacionada encontrada!!
            </h4>
          </div>
        </div>
      );

    return candidaturaCurriculo.map(({ Oportunidade, Id }, index) => {
      return (
        <div className="card card-pricing" key={index}>
          <div className="card-header">
            <h4 className="card-title">
              {' '}
              {Oportunidade.TipoFuncao.Designacao}
            </h4>
            <div className="card-price">
              <span className="price">
                {formatValue(Oportunidade.Salario * 1)}
              </span>
              <span className="text">/mês</span>
            </div>
          </div>
          <div className="card-body">
            <ul className="specification-list">
              <li>
                <span className="name-specification">Contrato</span>
                <span className="status-specification">
                  {Oportunidade.TipoEmprego.Designacao}
                </span>
              </li>
              <li>
                <span className="name-specification">Experiência</span>
                <span className="status-specification">
                  {Oportunidade.Experiencia}
                </span>
              </li>
              <li>
                <span className="name-specification">Número de Vagas</span>
                <span className="status-specification">
                  {Oportunidade.NumVagas}
                </span>
              </li>
              <li>
                <span className="name-specification">Data Limite</span>
                <span className="status-specification">
                  {new Date(Oportunidade.DataLimite).toDateString()}
                </span>
              </li>
              <li>
                <span className="name-specification">Carga Horaria</span>
                <span className="status-specification">
                  {Oportunidade.CargaHoraria}
                </span>
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <ActionsButton>
              <Button
                onClick={() => {
                  handleApprove({
                    Id,
                    CandidatoId,
                    IsAnalizado: 1,
                  });
                }}
              >
                <i className="icon-pin" />
                Aprovar
              </Button>
              <Button
                onClick={() => {
                  handleApprove({
                    Id,
                    CandidatoId,
                    IsAnalizado: -1,
                  });
                }}
              >
                <i className="flaticon-cross" />
                Rejeitar
              </Button>
            </ActionsButton>
          </div>
        </div>
      );
    });
  }

  function curriculoIdiomas() {
    return pessoaIdiomas.map(({ Id, Percentagem, Idioma }) => {
      return (
        <React.Fragment key={Id}>
          <ItemValue>
            {Idioma.Designacao} <Small>{Percentagem}%</Small>
          </ItemValue>
          <div className="progress progress-sm">
            <div
              className="progress-bar bg-secondary "
              role="progressbar"
              style={{ width: `${Percentagem}%` }}
              aria-valuenow={Percentagem}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </React.Fragment>
      );
    });
  }

  async function handleSubmit(data, { reset }) {
    data.CandidaturaId = CandidaturaId;
    data.DetalheEspecifico = detalhe;
    data.PessoaId = CandidatoId;

    const Ischema = {
      TipoDocumentoId: Yup.string().required(
        'Tipo de Solicitação Obrigatório.'
      ),
      CandidaturaId: Yup.string().required('Tipo de Solicitação Obrigatório.'),
    };

    let isValid = await unFormValidator(formRef, { data, reset }, Ischema);
    if (!isValid) return;

    let result = await iservice.store({
      table: 'SolicitacaoDocumento',
      value: data,
      properties: 'Id',
    });

    if (result.errors) return toast.error(result.errors[0].message);

    toast.success('Solicitação feita!!!');
    setTimeout(() => {
      toggle();
    }, 3000);
  }

  function handleClick() {
    formRef.current.submitForm();
  }

  return (
    <Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Solicitar Documentos</ModalHeader>
        <ModalBody>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Field
              label="Tipo de Solicitações"
              fieldtype="select"
              name="TipoDocumentoId"
              options={tipoDocumentos}
              isDisabled={tipoDocumentos.length === 0 ? true : false}
              isLoading={tipoDocumentos.length === 0 ? true : false}
              isMulti
            />
            <Field
              label="Detalhe de documentos específico"
              fieldtype="textarea"
              onChange={(e) => {
                console.log(e.target.value, e.value);
                setDetalhe(e.target.value);
              }}
              name="DetalheEspecifico"
              options={[]}
              isDisabled={![]}
              isMult
            />
          </Form>
        </ModalBody>
        <ModalFooter style={{ display: 'flex', flexDirection: 'row' }}>
          <ActionsButton style={{ width: '120px' }}>
            <Button color="primary" onClick={handleClick}>
              <i className="flaticon-message" />
              Enviar
            </Button>
          </ActionsButton>
          <ActionsButton style={{ width: '120px' }}>
            <Button
              color="secondary"
              onClick={toggle}
              style={{ color: ' #dc3545' }}
            >
              <i className="flaticon-cross" />
              Cancel
            </Button>
          </ActionsButton>
        </ModalFooter>
      </Modal>
      <Col xl="9">
        {curriculo ? (
          <PerfectScrollbar>
            <div style={{ height: '80vh' }}>
              <Card>
                <CardBody>
                  <Row>
                    <Col xl="12 mb-3">
                      <Header>
                        {/* <Skeleton circle={true} height={50} width={50} /> */}
                        <div className="avatar avatar-xl">
                          <img
                            src="/img/profile.jpg"
                            alt="..."
                            className="avatar-img rounded-circle"
                          />
                        </div>
                        <SubHeader>
                          <Title>{nomeCompleto || <Skeleton />}</Title>
                          <SubTitle>
                            {curriculo?.Designacao || <Skeleton />}
                          </SubTitle>
                        </SubHeader>
                      </Header>
                    </Col>

                    <Col xl="7">
                      <DetailsContent>
                        <ItemSingle>
                          <Icon>
                            <i className="fas fa-layer-group"></i>
                          </Icon>
                          <ItemContainer>
                            <ItemTitle>Resumo profissional</ItemTitle>
                            <ItemValue>
                              {curriculo?.ResumoProfissional || <Skeleton />}
                            </ItemValue>
                          </ItemContainer>
                        </ItemSingle>
                      </DetailsContent>
                      {curriculoDetalhes()}
                    </Col>
                    <Col xl="5 pl-md-0">
                      <DetailsContent>
                        <ItemSingle>
                          <ItemContainer>
                            <ItemTitle>Dados Pessoais</ItemTitle>
                            <ItemValue>{morada || <Skeleton />},</ItemValue>
                            <ItemValue>
                              Angola, {dadosPessoas.Telefone || <Skeleton />}
                            </ItemValue>
                            <ItemValueAsEmail>
                              {dadosPessoas.Email || <Skeleton />}
                            </ItemValueAsEmail>
                          </ItemContainer>
                        </ItemSingle>
                      </DetailsContent>
                      <DetailsContent>
                        <ItemSingle>
                          <ItemContainer>
                            <ItemTitle></ItemTitle>
                            <ItemValue>Data/ Local de nascimento</ItemValue>
                            <ItemValue>{dataNascimento}</ItemValue>
                            <ItemValue>Luanda</ItemValue>
                          </ItemContainer>
                        </ItemSingle>
                      </DetailsContent>

                      <DetailsContent>
                        <ItemSingle>
                          <ItemContainer>
                            <ItemTitle></ItemTitle>
                            <ItemValue>Nacionalidade</ItemValue>
                            <ItemValue>Cacuaco</ItemValue>
                          </ItemContainer>
                        </ItemSingle>
                      </DetailsContent>

                      <DetailsContent>
                        <ItemSingle>
                          <ItemContainer>
                            <ItemTitle>Competências</ItemTitle>
                            {curriculoSkills()}
                          </ItemContainer>
                        </ItemSingle>
                      </DetailsContent>
                      <DetailsContent>
                        <ItemSingle>
                          <ItemContainer>
                            <ItemTitle>Idiomas</ItemTitle>
                            {curriculoIdiomas()}
                          </ItemContainer>
                        </ItemSingle>
                      </DetailsContent>
                      <DetailsContent>
                        <ItemSingle>
                          <ItemContainer>
                            <ItemTitle>Hobbies</ItemTitle>
                            {curriculoHobes()}
                          </ItemContainer>
                        </ItemSingle>
                      </DetailsContent>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </PerfectScrollbar>
        ) : (
          <Card>
            <CardBody>
              <h4 className="card-title text-warning">Sem Curriculo</h4>
            </CardBody>
          </Card>
        )}
      </Col>
      <Col xl="3  pl-md-0">
        <Card>
          <CardBody>
            <Row>
              <Col xl="12 mb-3">
                <ActionsButton>
                  <Button onClick={toggle}>
                    <i className="flaticon-file" />
                    Solicitar Documentos
                  </Button>
                </ActionsButton>
              </Col>
              <Col xl="12">
                <ActionsButton>
                  <Button
                    onClick={() => {
                      handleApprove({
                        Id: CandidaturaId,
                        CandidatoId,
                        IsAnalizado: 1,
                      });
                    }}
                  >
                    <i className="icon-pin" />
                    Aprovar
                  </Button>
                  <Button
                    onClick={() => {
                      handleApprove({
                        Id: CandidaturaId,
                        CandidatoId,
                        IsAnalizado: -1,
                      });
                    }}
                  >
                    <i className="flaticon-cross" />
                    Rejeitar
                  </Button>
                </ActionsButton>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Row>
          <Col xl="12">
            <PerfectScrollbar>
              <div style={{ height: '470px' }}>{curriculoCandidaturas()}</div>
            </PerfectScrollbar>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
