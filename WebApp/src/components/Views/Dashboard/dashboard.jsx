import React, { Component } from 'react'
// import {donut, pie, bar,area,serieArea,responsiveChart,seriesresponsiveChart,doubleLine,serieDoubleLine} from "../../charts/contains/iss-options";
import { Col, Row, Card, CardHeader, CardBody } from 'reactstrap';
import MyComponent from '../../charts/iss-apexCharts';
// import IssApexCharts from "../../charts/iss-apexCharts";
export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                <Col xl="4">
              <Card>
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Actuação
                      </h6>
                      <h5 className="h3 mb-0">Total de pedidos</h5>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <MyComponent/>
                  </div>
                </CardBody>
              </Card>
            </Col>
                </Row>
            </div>
        )
    }
}
