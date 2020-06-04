import React, { useEffect, useRef } from 'react';
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
import IService from '../../../services/service';

const AddOportunidade = (props) => {
  const formRef = useRef(null);
  const { data, ADD_OPORTUNITIES } = props;

  useEffect(() => {
    renderData(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (data, { reset }) => {
    const iservice = new IService();

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

    let isValid = await unFormValidator(formRef, { data, reset }, Ischema);
    if (!isValid) return;
    //Eliminar a area do objecto
    delete data.area;
    let result = await iservice.store({
      table: 'oportunidade',
      value: data,
      properties: 'TipoFormacaoId',
    });

    console.log(result);
    console.log(isValid);
  };

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
                    Continuar
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
