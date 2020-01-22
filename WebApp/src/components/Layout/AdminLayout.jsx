import React, { Component } from 'react'
import MainHeader from '../Navs/MainHeader'
import SideBarMenu from '../Navs/SideBar'
import CustomTemplate from '../Navs/CustomTemplate'
import MainPanel from '../Navs/MainPanel'


export default class AdminLayout extends Component {

    render() {
        return (
            <div className="wrapper ">
                <MainHeader/>
                <SideBarMenu/>
                {/*Start Router */}
                <MainPanel {...this.props} />
                <CustomTemplate/>
                
            </div>
        )
    }
}
