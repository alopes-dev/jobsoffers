import React, { Component } from 'react'
import '../../assets/css/costumized.css'
import Authentication from '../Auth/Authentication'
export default class AuthLayout extends Component {
    render() {
        document.querySelector('body').classList.add('bg-secondary-gradientn')
        return (
            <Authentication/>
        )
    }
}
