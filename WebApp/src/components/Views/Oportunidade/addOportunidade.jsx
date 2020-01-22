import React, { Component } from 'react'
import Field from '../../ResusibleComponents/Fields/Field'
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap'

export default class AddOportunidade extends Component {
    render() {
        return (
            <Container>
                <Card>
                    <CardBody>

                        
                        <Row>
                            <Col md="4">
                                <Field
                                    label="Tipo de Função"
                                    fieldtype="select"
                                    name="emai"
                                    data={[ ]}
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Área funcional (Escolha áte 3 áreas)"
                                    fieldtype="select"
                                    data={[]}
                                    name="emai"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Tipo de Emprego"
                                    fieldtype="select"
                                    name="emai"
                                    data={[]}
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Cidade"
                                    type="text"
                                    fieldtype="input"
                                    name="emai"
                                    placeholder="Luanda"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Provincia"
                                    fieldtype="select"
                                    name="emai"
                                    data={[]}
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Indústria"
                                    fieldtype="select"
                                    name="emai"
                                    data={[]}
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Formação Académica"
                                    fieldtype="select"
                                    data={[]}
                                    name="emai"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Experiência Profissional"
                                    fieldtype="select"
                                    data={[]}
                                    name="emai"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Salário"
                                    type="text"
                                    fieldtype="input"
                                    name="emai"
                                    placeholder="Luanda"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Mostrar Salário"
                                    type="text"
                                    fieldtype="input"
                                    name="emai"
                                    placeholder="Luanda"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Data Limite"
                                    type="date"
                                    fieldtype="input"
                                    name="emai"
                                    placeholder="Luanda"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Nº de Vagas"
                                    type="number"
                                    fieldtype="input"
                                    name="emai"
                                    placeholder="Luanda"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Competência Deseja"
                                    type="text"
                                    fieldtype="input"
                                    name="emai"
                                    placeholder="Luanda"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Língua Referida"
                                    fieldtype="select"
                                    name="emai"
                                    data={[ ]}
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                            <Col md="4">
                                <Field
                                    label="Nacionalidade Referida"
                                    fieldtype="select"
                                    name="emai"
                                    data={[ ]}
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                    
                        </Row>
                        <Row>
                            <Col md="6">
                                <Field
                                    label="Sobre a Empresa"
                                    type="text"
                                    fieldtype="textarea"
                                    name="emai"
                                    placeholder="Luanda"
                                    msm={{
                                        text:"Email inválido...",
                                        type:"WARNING",
                                        show:false
                                    }}
                                
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <div className="float-right ">
                                    <Button className="ml-2 btn-primary">
                                        Continuar
                                    </Button>
                                    <Button className="ml-2 btn-danger">
                                        Cancelar
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}
