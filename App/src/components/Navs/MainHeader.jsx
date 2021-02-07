import React, { Component } from 'react'
import TopMenu from './TopMenu'
import NavBarHeader from './NavBarHeader'

export default class MainHeader extends Component {
    render() {
        return (
            <div className="main-header">
               <TopMenu/>
               <NavBarHeader/>
            </div>
        )
    }
}
