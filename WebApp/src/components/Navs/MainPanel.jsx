import React, { Component } from 'react'
import {Row, Col} from 'reactstrap';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { isEmpty } from '../../helpers';
export default class MainPanel extends Component {


    captionContent(){
        let {pageinfo:{name,Pname,action,aliasIcon,icon}} = this.props
        if(isEmpty(aliasIcon)) aliasIcon = icon
        Pname = Pname.charAt(0).toUpperCase() + Pname.substr(1,Pname.length)
        return(
            <div className="page-header">
                <h4 className="page-title">{Pname}</h4>
                <ul className="breadcrumbs">
                    <li className="nav-home">
                        <a href="#d">
                            <i className={aliasIcon} style={{fontSize: "19px"}}></i>
                        </a>
                    </li>
                    <li className="separator">
                        <i className="flaticon-right-arrow"></i>
                    </li>
                    <li className="nav-item">
                        <a href="#d">{name}</a>
                    </li>
                    <li className="separator">
                        <i className="flaticon-right-arrow"></i>
                    </li>
                    <li className="nav-item">
                        <a href="#d">{action}</a>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        let {pageinfo:{path,components}} = this.props
        return (
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                    
                        {/* Caption of the page that will return*/}
                        {this.captionContent()}
                        
                        <Row>
                            <Col md="12">
                                {/* <AddCandidato /> */}
                                <BrowserRouter>
                                    <Switch>
                                        <Route 
                                            path={path}
                                            component={components}
                                        />
                                    </Switch>
                                </BrowserRouter>
                                {/* <Switch>{this.getRoutes(routes)}</Switch> */}
                            </Col>
                        </Row>
                        
                        {/* Display all page content dynamicly here... */}

                    </div>
                </div>
            </div>
        )
    }
}
