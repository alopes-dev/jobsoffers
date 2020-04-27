import React, { Component } from 'react'
import { Container, Button, Modal} from 'reactstrap';
import DefaultImg from "../../../imgs/uploadPlaceHolder.jpg";
import PreviewImage from '../ImageScrop';
import CandidatoForms from './components/forms'

const GRAPHQL_END_POINT = 'http://localhost:5500/graphql';


export default class AddCandidato extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            defaultModal: false,
            img:DefaultImg,
            fields:{
                estados:[]
            }
        }
    }

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
    };
    
    async componentWillMount(){

        let query = {
            query:`{Estados{Designacao  Id}}`
        }
        try {
            const e = await fetch(GRAPHQL_END_POINT,{ method: "post", body: JSON.stringify(query), headers: { "Content-Type":"application/json" } })
    
           const data = await  e.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        
    }

    render() {
        return (
           <Container fluid style={{background:"white",padding:"20px"}}>
                <CandidatoForms/> 
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
