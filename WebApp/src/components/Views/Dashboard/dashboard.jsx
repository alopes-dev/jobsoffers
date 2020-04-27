import React, { Component } from 'react'
import { Col, Row } from 'reactstrap';
import Index from '../../ResusibleComponents/@tables';

const data = [
    {icon:'flaticon-coins text-success',name:'Rendimento', value:'1,982'},
    {icon:'flaticon-users text-primary',name:'Subscribers', value:'1303'},
    {icon:'flaticon-graph text-success',name:'Revenue', value:'1,982'},
    {icon:'flaticon-interface-6 text-warning',name:'Number', value:'1,982'},
]

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                 <Index
                  ilustrate={{data}}
                  values={[3]}
                  options={{
                    Salario:{
                        preview:"Salário"
                    },
                    Experiencia:{
                        preview:"Experiência"
                    },
                    NumVagas:{
                        preview:"Nº de Vagas"
                    },
                    TipoFuncao:{
                        preview:"Tipo de Função"
                    },
                    TipoFormacao:{
                        preview:"Tipo de Formação"
                    },
                    Provincia:{
                        preview:"Tipo de Função"
                    },
                    Nacionalidade:{
                        preview:"Nacionalidade"
                    },
                    Estado:{
                        preview:"Estado"
                    },
                }}
                 />
            </div>
        )
    }
}
