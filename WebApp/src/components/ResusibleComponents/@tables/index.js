import React from 'react';
import {
  Col,
  ResponsiveTable,
  Container,
  TableHeader,
  TableRow
} from './style';
import CardIIustrated from '../tables/cardIIustrated';
import { isEmpty } from '../../../helpers';

export default function Index({ values, ilustrate, options, ...rest }) {
  const thead = data => {
    return Object.keys(data).map(d => {
      return <Col> {data[d].preview} </Col>;
    });
  };

  const tbody = (values, options) => {
    if (isEmpty(values)) return noContentFound();
    return values.map(v => {
      return (
        <TableRow>
          {Object.keys(options).map(op => {
            return (
              <Col
                onClick={() => {
                  rest.onItemClick(v);
                }}
                data-label={op}
              >
                {v[op]}
              </Col>
            );
          })}
          <Col size={3}>
            <i className="flaticon-file-1 actions-icon"></i>
            <i
              className="flaticon-pen actions-icon"
              onClick={() => {
                rest.editLine(v);
              }}
            ></i>
            <i
              className=" flaticon-interface-5 actions-icon"
              onClick={() => {
                rest.removeLine(v);
              }}
            ></i>
          </Col>
        </TableRow>
      );
    });
  };
  const noContentFound = () => {
    return (
      <TableRow>
        <Col colSpan="12">
          <div className="row">
            <div className="col-12">
              <div className="icon-big text-center">
                <i className="flaticon-database text-warning "></i>{' '}
                <span> Sem dados disponível...</span>
              </div>
            </div>
          </div>
        </Col>
      </TableRow>
    );
  };
  return (
    <div>
      <Container>
        {!isEmpty(ilustrate) && <CardIIustrated options={ilustrate.data} />}
        <ResponsiveTable>
          <TableHeader>
            {thead(options)}
            <Col size={2}>
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="#as"
                aria-expanded="false"
                style={{ color: '#ffffff' }}
              >
                <i className="flaticon-settings"></i>
              </a>
              <div
                style={{ top: '-12px', left: ' -78px', position: 'absolute' }}
              >
                <div className="dropdown-menu quick-actions quick-actions-info animated fadeIn">
                  <div className="quick-actions-scroll scrollbar-outer">
                    <div className="quick-actions-items">
                      <div className="row m-0">
                        <a className="col-6 col-md-4 p-0" href="#as">
                          <div className="quick-actions-item">
                            <i className="flaticon-file-1"></i>
                            <span className="text">Generated Report</span>
                          </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#as">
                          <div className="quick-actions-item">
                            <i className="flaticon-database"></i>
                            <span className="text">Create New Database</span>
                          </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#as">
                          <div className="quick-actions-item">
                            <i className="flaticon-pen"></i>
                            <span className="text">Create New Post</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </TableHeader>
          {tbody(values, options)}
        </ResponsiveTable>
      </Container>
    </div>
  );
}
