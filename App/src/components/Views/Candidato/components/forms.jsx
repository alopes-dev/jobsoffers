import React,{useState} from 'react';
import {Col, Row, Button} from 'reactstrap';
import Field from '../../../ResusibleComponents/Fields/Field'
import DefaultImg from "../../../../imgs/uploadPlaceHolder.jpg";

const CandidatoForms = (props)=>{
    const [state, setstate] = useState({
        defaultModal: false,
        img:DefaultImg,
        fields:{
            estados:[]
        }
    })

    return (
        <>
    <Row>
        <Col md="3" xl="3"  className=" pl-md-0 pr-md-0">
            <div className="card-pricing2 card-secondary">
                <div className="pricing-header">
                    <h3 className="fw-bold">'</h3>
                    <span className="sub-title"></span>
                </div>
                <div className="price-value">
                    <div className="value">
                        <img
                            onClick={e =>{
                                this.toggleModal("defaultModal")
                            }}
                            title="Adicionar uma foto"
                            alt="..."
                            className="img-default rounded-circle img-center img-fluid shadow shadow-lg--hover"
                            src={state.img}
                        
                        />
                    </div>
                </div>
                <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5><b>Total Revenue</b></h5>
                            <p className="text-muted">All Customs Value</p>
                        </div>
                        
                    </div>
                    <div className="progress progress-sm">
                        <div className="progress-bar bg-success w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <p className="text-muted mb-0">Change</p>
                        <p className="text-muted mb-0">25%</p>
                    </div>
                </div>
            </div>
                    
            </div>
        </Col>
        <Col md="9">
            <Row>
                <Col xl="12 mb-3 mt-1" className="bg-secondaries pt-2 pb-0 pl-3 pr-3">
                    <h5>Informação Pessoal</h5>
                </Col>
            <Col md="6" lg="4" xs="12" sm="12">
                <Field
                    label="Nome"
                    type="text"
                    fieldtype="input"
                    name="emai"
                    placeholder="António"
                    msm={{
                        text:"Email inválido...",
                        type:"WARNING",
                        show:false
                    }}
                
                />
            </Col>
            <Col md="6" lg="4" xs="12">
                <Field
                    label="Sobrenome"
                    type="email"
                    fieldtype="input"
                    name="emai"
                    placeholder="Lopes"
                    msm={{
                        text:"Email inválido...",
                        type:"WARNING",
                        show:false
                    }}
                
                />
            </Col>
            <Col md="6" lg="4" xs="12">
                <Field
                    label="Data Nascimento"
                    type="date"
                    
                    fieldtype="input"
                    name="emai"
                    placeholder="Lopes"
                    msm={{
                        text:"Email inválido...",
                        type:"WARNING",
                        show:false
                    }}
                
                />
            </Col>
            <Col md="6" lg="4" xs="12">
                <Field
                    label="Localização"
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
        </Row>
        <Row>
            <Col xl="12 mb-3 mt-1" className="bg-secondaries pt-2 pb-0 pl-3 pr-3">
                <h5>Documentos</h5>
            </Col>
            <Col md="4">
                <Field
                    label="Tipo de Documento"
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
                    label="Número de Identificação"
                    type="text"
                    fieldtype="input"
                    placeholder="006772018LA047"
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
                    label="Estado"
                    fieldtype="select"
                    name="emai"
                    options={state.fields.estados}
                    msm={{
                        text:"Email inválido...",
                        type:"WARNING",
                        show:false
                    }}
                
                />
            </Col>
                                        
            </Row>

            <Row>
            <Col xl="12 mb-3 mt-1" className="bg-secondaries pt-2 pb-0 pl-3 pr-3">
                <h5>Dados do Contacto</h5>
            </Col>
            <Col md="4">
                <Field
                    label="Telefone"
                    type="text"
                    fieldtype="input"
                    placeholder="927383410"
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
                    label="Telefone Alternativo"
                    type="text"
                    fieldtype="input"
                    placeholder="927383410"
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
                    label="E-mail"
                    type="email"
                    fieldtype="input"
                    name="emai"
                    placeholder="exemplo@gmai.com"
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
                    label="Telefone Alternativo"
                    type="email"
                    fieldtype="input"
                    placeholder="exemplo@gmai.com"
                    name="emai"
                    msm={{
                        text:"E-mail inválido...",
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
        </Col>
        </Row> 

        </>
    )
}

export default CandidatoForms;