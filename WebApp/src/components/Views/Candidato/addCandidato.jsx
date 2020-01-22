import React, { Component } from 'react'
import Field from '../../ResusibleComponents/Fields/Field'
import {Col, Row, Container, Button, Modal} from 'reactstrap';
import DefaultImg from "../../../imgs/uploadPlaceHolder.jpg";
import PreviewImage from '../ImageScrop';
export default class AddCandidato extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            defaultModal: false,
            img:DefaultImg,
        }
    }

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
    };
    

    render() {
        return (
            <Container fluid>
                {/* <Row>
                    <Col md="3" sm="6">
                        <Card>
                            <CardBody style={{padding:" 4px 0 4px 0"}}>
                                <a href="#pablo" onClick={e =>{
                                    // e.preventDefault();
                                    // this.toggleModal("defaultModal")
                                }
                                }>
                                    <img
                                    title="Adicionar uma foto"
                                    alt="..."
                                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                    src="./img/uploadPlaceHolder.jpg"
                                    style={{ width: "140px",marginLeft: "50px" }}
                                    />
                                    <div className="checklist-item checklist-item-warning"></div>
                                </a>
                        
                            </CardBody>
                        </Card>
                    </Col>
                </Row> */}
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
                                            src={this.state.img}
                                        
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
                                    data={[]}
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

                    <Modal
                    className="modal-dialog-centered modal-md"
                    md="12"
                    isOpen={this.state.defaultModal}
                    toggle={() => this.toggleModal("defaultModal")}
                    >
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">
                            
                            </h6>
                            <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={(e) =>{

                                this.toggleModal("defaultModal")}
                            } 
                            >
                            <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <PreviewImage  renderImage={e=>{
                            this.img = e;
                        }}/>
                        </div>
                        <div className="modal-footer">
                            <Button
                            className="ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => {
                                this.setState({img:this.img})
                                this.toggleModal("defaultModal")}
                            }
                            >
                            Salvar
                            </Button>
                            <Button
                            className="ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("defaultModal")}
                            >
                            Fechar
                            </Button>
                        </div>
                </Modal>
            </Container>
        )
    }
}
