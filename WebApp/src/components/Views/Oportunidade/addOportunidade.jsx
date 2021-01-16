import React, { useEffect, useRef, useState } from 'react';
import Field from '../../ResusibleComponents/Fields/Field';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';

/** Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as oportunidadeActions from '../../../store/actions/oportunidade';
import { isEmpty } from '../../../helpers';
import {
  OportunidadeRenderData as renderData,
  getFuncoesByAreaId,
} from '../../../store/funcs/fetch';
import { Form } from '@unform/web';
import unFormValidator from '../../ResusibleComponents/Fields/contains/funcs';
import * as Yup from 'yup';
import iservice from '../../../services/service';
import { toast } from 'react-toastify';

const AddOportunidade = ({ oportunidadeEdit, ...props }) => {
  //#region Variables
  const formRef = useRef(null);
  const { data, ADD_OPORTUNITIES } = props;
  const [oportunidadeId, setOportunidadeId] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [navigateTo, setNavigateTo] = useState('');
  //#endregion

  //#region Handles functions
  const load = async () => {
    const oportunidadeDetalhe = localStorage.getItem(
      '@jobs:oportunidade-detalhe'
    );

    if (oportunidadeDetalhe) {
      const { Id } = JSON.parse(oportunidadeDetalhe)?.oportunidade;
      setOportunidadeId(Id);

      const response = await iservice.fetch({
        getById: {
          value: Id,
          field: 'Id',
          consts: 'Id',
        },
        table: 'oportunidade',
        properties: `
        Id
        CargaHoraria
        Salario
        DataLimite
        Experiencia
        NumVagas
        Detalhes
        IsFinalizado
        TipoEmprego{Designacao Id}
        TipoFormacao{Designacao Id}
        Cidade
        TipoFuncao{Designacao Id}
        EmpresaId
        Provincia{Designacao Id}
        Nacionalidade{Designacao Id}
        Estado{Designacao Id}
        createdAt
        updatedAt`,
      });

      const {
        data: {
          Nacionalidade,
          Estado,
          CargaHoraria,
          Cidade,
          Salario,
          Experiencia,
          NumVagas,
          DataLimite,
          Detalhes,
          Provincia,
          TipoFuncao,
          TipoFormacao,
          TipoEmprego,
        },
      } = response;

      formRef.current.setData({
        Cidade,
        Salario,
        Experiencia,
        NumVagas,
        DataLimite,
        Detalhes,
        CargaHoraria: [{ value: CargaHoraria, label: CargaHoraria }],
        EstadoId: [{ value: Estado.Id, label: Estado.Designacao }],
        NacionalidadeId: [
          { value: Nacionalidade.Id, label: Nacionalidade.Designacao },
        ],
        ProvinciaId: [{ value: Provincia.Id, label: Provincia.Designacao }],
        TipoFuncaoId: [{ value: TipoFuncao.Id, label: TipoFuncao.Designacao }],
        TipoEmpregoId: [
          { value: TipoEmprego.Id, label: TipoEmprego.Designacao },
        ],
        TipoFormacaoId: [
          { value: TipoFormacao.Id, label: TipoFormacao.Designacao },
        ],
      });
    }
  };

  const handleSubmit = async (data, { reset }) => {
    const Ischema = {
      area: Yup.string().required('Área é obrigatório.'),
      EstadoId: Yup.string().required('Estado é obrigatório.'),
      NacionalidadeId: Yup.string().required('Nacionalidade é obrigatório.'),
      IdiomaId: Yup.array().required('Idioma é obrigatório.'),
      BeneficioId: Yup.array().required('Benefício é obrigatório.'),
      CompetenciaId: Yup.array().required('Competência é obrigatório.'),
      CargaHoraria: Yup.string().required('Carga Horária é obrigatório.'),
      Salario: Yup.string().required('Salário é obrigatório.'),
      Experiencia: Yup.string().required('Experiência é obrigatório.'),
      Cidade: Yup.string().required('Cidade é obrigatório.'),
      TipoFormacaoId: Yup.string().required('Tipo de Formação é obrigatório.'),
      ProvinciaId: Yup.string().required('Provincia é obrigatório.'),
      TipoFuncaoId: Yup.string().required('Tipo de Função é obrigatório.'),
      TipoEmpregoId: Yup.string().required('Tipo de Emprego é obrigatório.'),
      NumVagas: Yup.number().required('Número de Vagas é obrigatório.'),
      DataLimite: Yup.date().required('Data Limite é obrigatório.'),
    };

    if (oportunidadeEdit) {
      delete data.area;
      setIsUpdating(true);
      await iservice.useGeneric({
        query: `mutation OportunidadeInput($input:OportunidadeInput,$id:String!){
          updateOportunidade(input:$input,Id:$id){Id}
        }`,
        variables: { id: oportunidadeId, input: data },
      });
      setIsUpdating(false);

      setTimeout(() => {
        setNavigateTo('list-oportunidade');
      }, [600]);
      return toast.success('Atualizado com successo!!');
    }

    let isValid = await unFormValidator(formRef, { data, reset }, Ischema);
    if (!isValid) return;

    const user = localStorage.getItem('@jobs:user');

    if (isEmpty(user)) return toast.warning('Forneça a empresa..');

    const { EmpresaId } = JSON.parse(user);
    //Eliminar a area do objecto
    delete data.area;

    if (isEmpty(EmpresaId)) return toast.warning('Forneça a empresa..');
    data['EmpresaId'] = EmpresaId;

    const response = await iservice.store({
      table: 'oportunidade',
      type: 'STORE',
      value: data,
      useExclamation: false,
      properties: 'Id',
    });

    if (response.errors) return toast.error(response.errors[0].message);

    return toast.success('Oportunidade feito com sucesso!');
  };

  //#endregion

  //#region useEffects
  useEffect(() => {
    renderData(props);
  }, []);

  useEffect(() => {
    if (!oportunidadeEdit) return;
    load();
  }, [oportunidadeEdit]);

  useEffect(() => {
    if (!isEmpty(navigateTo)) window.location = '/list-oportunidade';
  }, [navigateTo]);
  //#endregion

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Card>
          <CardBody>
            <Row>
              <Col md="4">
                <Field
                  label="Àrea"
                  fieldtype="select"
                  name="area"
                  options={data.Areas}
                  isDisabled={!data.Areas}
                  isLoading={!data.Areas}
                  onChange={(e) => {
                    getFuncoesByAreaId(e.value, props);
                  }}
                />
              </Col>
              <Col md="4">
                <Field
                  label="Tipo de Função"
                  fieldtype="select"
                  name="TipoFuncaoId"
                  options={data.TipoFuncoes}
                  isDisabled={!data.TipoFuncoes}
                />
              </Col>

              <Col md="4">
                <Field
                  label="Tipo de Emprego"
                  fieldtype="select"
                  name="TipoEmpregoId"
                  options={data.TipoEmpregos}
                  isDisabled={!data.TipoEmpregos}
                  isLoading={!data.TipoEmpregos}
                  onChange={(e) => {
                    //formData['TipoEmpregoId'] = e.value
                  }}
                />
              </Col>
              <Col md="4">
                <Field
                  label="Cidade"
                  type="text"
                  fieldtype="input"
                  name="Cidade"
                  placeholder="Luanda"
                />
              </Col>
              <Col md="4">
                <Field
                  label="Provincia"
                  fieldtype="select"
                  name="ProvinciaId"
                  options={data.Provincias}
                  isDisabled={!data.Provincias}
                  isLoading={!data.Provincias}
                />
              </Col>

              <Col md="4">
                <Field
                  label="Formação Académica"
                  fieldtype="select"
                  options={data.TipoFormacaos}
                  isDisabled={!data.TipoFormacaos}
                  isLoading={!data.TipoFormacaos}
                  name="TipoFormacaoId"
                />
              </Col>
              <Col md="2">
                <Field
                  label="Experiência Profissional"
                  fieldtype="select"
                  options={data.Experiencia}
                  name="Experiencia"
                />
              </Col>
              <Col md="2">
                <Field
                  label="Salário"
                  type="text"
                  fieldtype="input"
                  name="Salario"
                  placeholder="10-000.00"
                />
              </Col>
              <Col md="2">
                <Field
                  label="Nº de Vagas"
                  type="number"
                  fieldtype="input"
                  name="NumVagas"
                  placeholder="1"
                />
              </Col>

              <Col md="3">
                <Field
                  label="Data Limite"
                  type="date"
                  fieldtype="input"
                  name="DataLimite"
                  placeholder="Luanda"
                />
              </Col>

              <Col md="3">
                <Field
                  label="Carga Horária"
                  fieldtype="select"
                  name="CargaHoraria"
                  placeholder="1hr"
                  options={data.cargaHorario}
                />
              </Col>
              <Col md="4">
                <Field
                  label="Competência Deseja"
                  fieldtype="select"
                  options={data.Competencias}
                  isDisabled={!data.Competencias}
                  isLoading={!data.Competencias}
                  isMulti
                  name="CompetenciaId"
                  placeholder="Luanda"
                />
              </Col>
              <Col md="4">
                <Field
                  label="Língua Referida"
                  fieldtype="select"
                  name="IdiomaId"
                  options={data.Idiomas}
                  isDisabled={!data.Idiomas}
                  isLoading={!data.Idiomas}
                  isMulti
                />
              </Col>
              <Col md="4">
                <Field
                  label="Nacionalidade Referida"
                  fieldtype="select"
                  name="NacionalidadeId"
                  options={data.Nacionalidades}
                  isDisabled={!data.Nacionalidades}
                  isLoading={!data.Nacionalidades}
                />
              </Col>
              <Col md="4">
                <Field
                  label="Benéficios"
                  fieldtype="select"
                  name="BeneficioId"
                  isMulti
                  options={data.Beneficios}
                  isDisabled={!data.Beneficios}
                  isLoading={!data.Beneficios}
                />
              </Col>
              <Col md="4">
                <Field
                  label="Estado"
                  fieldtype="select"
                  name="EstadoId"
                  options={data.allEstados}
                  isDisabled={!data.allEstados}
                  isLoading={!data.allEstados}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Field
                  label="Sobre a Empresa"
                  type="text"
                  fieldtype="textarea"
                  name="Detalhes"
                  placeholder="Luanda"
                  onChange={(e) => {
                    //formData['Detalhe'] = e.target.value
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="float-right ">
                  <Button className="ml-2 btn-primary" type="submit">
                    {oportunidadeEdit
                      ? isUpdating
                        ? 'Atualizando...'
                        : 'Actualização'
                      : 'Salvar'}
                  </Button>
                  <Button className="ml-2 btn-danger">Cancelar</Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(oportunidadeActions, dispatch);

const mapStateToProps = (state) => ({
  data: isEmpty(state.oportunidade) ? {} : state.oportunidade,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOportunidade);
