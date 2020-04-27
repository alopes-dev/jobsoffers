import React, { Fragment } from "react";
// nodejs library that concatenates classes
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import Field from "../ResusibleComponents/Fields/Field";
import { isEmpty } from "../../helpers";
import Spinner from "../ResusibleComponents/Spinner";

import { Animated } from "react-animated-css";

import { Form } from '@unform/web'
import * as Yup from "yup";
import unFormValidator from "../ResusibleComponents/Fields/contains/funcs";
// core components


class Authentication extends React.Component {
    constructor(props) {
        super(props)
        this.options = [
            {name:"Candidato",icon:'candidato.png',margign:'mr-3',margignL:'60px'},
            {name:"Empregador",icon:'empregador.png',margign:'ml-3'}
        ];
        this.checker = 'login';
        this.Ischema = null;
        this.state = {
            action:'',
            papel:'',
            password:{},
            username:{},
            login:{
                username:'',
                password:''
            } 
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.formRef = React.createRef(null)
    }
    
     componentWillMount(){
        fetch('http://localhost:5500/api/estados')
        .then(async e=>{
            let dat = await e.json()
            console.log(dat)
        })
        
    }

  registerFields(){
      return(
          
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
                     <div class="card-title  mt-4 fw-mediumbold">Registrar {this.state.papel} 
                         <div className="float-right"><i className="flaticon-back c-pointer --theme-hover" onClick={e=>{
                            this.setState({papel:''})
                         }}></i> </div>
                     </div>
                </Col>
                    <Col md="6">
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
                    <Col md="6">
                        <Field
                            label="Username"
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
                    <Col md="6">
                        <Field
                            label="E-mail"
                            type="text"
                            fieldtype="input"
                            name="emai"
                            placeholder="ex@gmail.com"
                            msm={{
                                text:"Email inválido...",
                                type:"WARNING",
                                show:false
                            }}
                        
                        />
                    </Col>
                    <Col md="6">
                        <Field
                            label="E-mail Alternativo"
                            type="text"
                            fieldtype="input"
                            name="emai"
                            placeholder="ex@gmail.com"
                            msm={{
                                text:"Email inválido...",
                                type:"WARNING",
                                show:false
                            }}
                        
                        />
                    </Col>
                    <Col md="6">
                        <Field
                            label="Senha"
                            type="password"
                            fieldtype="input"
                            name="emai"
                            placeholder="*****"
                            msm={{
                                text:"Email inválido...",
                                type:"WARNING",
                                show:false
                            }}
                        
                        />
                    </Col>
                    <Col md="6">
                        <Field
                            label="Confirmar Senha"
                            type="password"
                            fieldtype="input"
                            name="emai"
                            placeholder="*****"
                            msm={{
                                text:"Email inválido...",
                                type:"WARNING",
                                show:false
                            }}
                        
                        />
                    </Col>
                    <Col  md="6">
                        <div class="form-group mb-2 p-0">
                            <label>Captcha Code</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Hjq23YSH</span>
                                </div>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                                <div class="input-group-append" style={{cursor:"pointer"}}>
                                    <span class="input-group-text"><i className="flaticon-repeat"></i> </span>
                                </div>
                            </div>
                        </div>
                    </Col>


                    <Col xl="12 p-2">
                        <Button className="ml-2 btn-primary">
                            Registrar
                        </Button>
                    </Col>
                </Row>
            </Animated>
        </Col>
      )
  }

  registerOptions(){
        return(
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
                    <div class="card-title  mt-4 fw-mediumbold" style={{marginLeft:"57px"}}>Escolha uma Opção</div>
                    <div className="c-flex" style={{marginTop:"60px"}}>
                        {this.options.map(o=>{
                            return (
                                <div className={`card  c-pointer --b-color-theme orange c-hover card-round ${o.margign}`} 
                                    style={{marginLeft:o.margignL}}
                                    title={o.name.toUpperCase()}
                                    onClick={e=>{
                                        this.setState({papel:o.name})
                                    }}
                                    >
                                    <div className="card-body">
                                        <div className="avatar avatar-xxl max">
                                            <img className="avatar-img" src={`./img/${o.icon}`} alt={o.name}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Animated>
            </Col>
            </Fragment>
        )
    }

  register(){
    this.checker = 'register'
        return(
            <Row className="ml-3 mr-3">
                {
                    this.state.papel === 'Candidato' ?
                     this.registerFields()
                    : this.state.papel === 'Empregador'
                    ? this.registerOptions()
                    :this.registerOptions()
                }
            </Row>
        )
  }

  login(){
    this.checker = 'login'
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
                <div class="card-title  mt-4 fw-mediumbold" style={{marginLeft: "106px"}}>Login</div>
            </Col>
            <Col md="12">
                <Row style={{marginTop: "60px"}}>
                    <Col md="8 login-center">
                        <Field
                            label="Email / Username"
                            type="email"
                            fieldtype="input"
                            name="email"
                            placeholder="António"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="8 login-center">
                        <Field
                            label="Username"
                            type="password"
                            fieldtype="input"
                            name="password"
                            placeholder="*****"
                            msm={this.state.password}
                        />
                    </Col>
                    <Col xl="12 p-2 ">
                        <div style={{marginLeft: "106px",marginTop: "20px"}}>
                            <Button className="ml-2 btn-primary" type="submit" > Entrar </Button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Animated>
   )
  }

  refresh(e){
    // e.target.parentElement.classList.remove('has-error')
    // e.target.parentElement.querySelector('small').classList.remove('text-danger')
    // e.target.parentElement.querySelector('small').innerHTML = ''

  }

 async handleSubmit(data, {reset}){

    if(this.checker === 'login'){
       return this.onLogin({data,reset})
    }
  }

  async onLogin({data,reset}){

    this.Ischema = {
        email: Yup.string().email('E-mail inválido!!').required('E-mail é obrigatória...'),
        password:Yup.string().required('A palavra passe é obrigatória...')
    }

    const isValid = await unFormValidator(this.formRef,{data,reset},this.Ischema);

    if(isValid.success){
        setTimeout(()=>{
            window.location = '/dashboard'
        },3000)
    }
  }

  forgetPassword(){

  }

  render() {
    const {action} = this.state;
    return (
      <>
   
        <Container >
          <Row >
            <Col md="12">
                <div className="justify-content-center "> 
                    <Card className="p-0 m-0" style={{top: "50%",transform:" translateY(23%)",height:"450px",  position: "absolute",width:" 100%"}}> 
                        <CardBody className="p-0 m-0">
                            <Row className="p-0" style={{marginLeft: "0px"}}>
                                <Col md="4 bg-" style={{position:"relative",borderBottomLeftRadius: "5px",borderTopLeftRadius: "5px"}}>
                                    <div style={{height: "450px",borderRadius: "5px"}}>
                                        <div class="profile-picture">
                                            <div class="avatar avatar-xl" style={{display: "flex",margin:" 0 auto"}}>
                                                <img src="./img/jobsNoBackGround.png" alt="..." class="avatar-img rounded-circle" />
                                            </div>
                                        </div>
                                        {/* <img class="card-img-top" src="./img/jobs.png" alt="Card" /> */}
                                        <div className="clips">
                                            <img class="card-img-top" src="./img/Kubernetes.png" alt="Card" />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="8" className="pl-0">
                                    <div className="form-flex">
                                        <div className="form-type">
                                            <div className="icon-action " onClick={e=>{
                                                this.setState({action:"login"})
                                                document.querySelectorAll('.icon-big').forEach(i=>{
                                                    i.classList.remove('active')
                                                })
                                                document.querySelector('.login').classList.add('active')    
                                            }}>
                                                <div className="icon-big active login text-center">
                                                    <i className="icon-lock-open"></i>
                                                    <p>Login</p>
                                                    <div className="hover"></div>
                                                </div>
                                            </div>
                                            <div className="icon-action" onClick={e=>{
                                                    this.setState({action:"registe"})
                                                    document.querySelectorAll('.icon-big').forEach(i=>{
                                                        i.classList.remove('active')
                                                    })
                                                    document.querySelector('.registe').classList.add('active')    
                                                }}>
                                                <div className="icon-big registe text-center">
                                                    <i className="flaticon-profile"></i>
                                                    <p>Register</p>
                                                    <div className="hover"></div>
                                                </div>
                                            </div>
                                            <div className="icon-action" onClick={e=>{
                                                    this.setState({action:"forget"})
                                                    document.querySelectorAll('.icon-big').forEach(i=>{
                                                        i.classList.remove('active')
                                                    })
                                                    document.querySelector('.forget').classList.add('active')    
                                                }}>
                                                <div className="icon-big forget text-center">
                                                    <i className="flaticon-lock-1"></i>
                                                    <p>Forget Password</p>
                                                    <div className="hover"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-fields">
                                             <Form ref={this.formRef} onSubmit={this.handleSubmit}>
                                                {
                                                action === 'forget'
                                                ?  this.forgetPassword()
                                                : action === 'registe'
                                                ? this.register()
                                                :  this.login()
                                                }
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
}

export default Authentication;
