import React from 'react';
import { Row, Col } from 'reactstrap';
import { isEmpty } from '../../helpers';
import MainRouter from './router';

function MainPanel({ pageinfo: { name, Pname, action, aliasIcon, icon } }) {
  function captionContent() {
    if (isEmpty(aliasIcon)) aliasIcon = icon;
    Pname = Pname.charAt(0).toUpperCase() + Pname.substr(1, Pname.length);

    return (
      <div className="page-header">
        <h4 className="page-title text-white">{Pname}</h4>
        <ul className="breadcrumbs">
          <li className="nav-home">
            <a href="#d">
              <i
                className={aliasIcon}
                style={{ fontSize: '19px', color: 'white' }}
              ></i>
            </a>
          </li>
          <li className="separator">
            <i className="flaticon-right-arrow text-white"></i>
          </li>
          <li className="nav-item">
            <a href="#d" className="text-white">
              {name}
            </a>
          </li>
          <li className="separator">
            <i className="flaticon-right-arrow"></i>
          </li>
          <li className="nav-item">
            <a href="#d">{action}</a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="main-panel">
      <div className="content">
        <div className="page-inner">
          {captionContent()}
          <Row>
            <Col md="12">
              <MainRouter />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MainPanel;
