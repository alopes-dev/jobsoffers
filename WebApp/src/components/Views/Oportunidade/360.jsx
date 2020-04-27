import React, { useState } from 'react';
import { Row, Card, Col, CardHeader, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';

export default function VOp360() {
  const [state, setstate] = useState({
    options: {
      chart: {
        height: 450,
        type: 'bar'
        // animations: {
        //   enabled: false
        // }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#37d6ab', 'rgb(89, 104, 226)', '#ffad46', '#48abf7'],
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },

      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May']
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$ ' + val + ' thousands';
          }
        }
      }
    },
    series: [
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61]
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87]
      },
      {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45]
      },
      {
        name: 'Free Cash Flow',
        data: [25, 51, 66, 46, 25]
      }
    ]
  });

  return (
    <div>
      <Row>
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round no-padding">
            <div class="card-body ">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-chart-pie text-warning"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Number</p>
                    <h4 class="card-title">150GB</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round no-padding">
            <div class="card-body ">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-coins text-success"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Revenue</p>
                    <h4 class="card-title">$ 1,345</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round no-padding">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-error text-danger"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Errors</p>
                    <h4 class="card-title">23</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="card card-stats card-round no-padding">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="icon-big text-center">
                    <i class="flaticon-twitter text-primary"></i>
                  </div>
                </div>
                <div class="col-7 col-stats">
                  <div class="numbers">
                    <p class="card-category">Followers</p>
                    <h4 class="card-title">+45K</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>

      <Row>
        <Col xl="6" sm="6" md="3">
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="100%"
                background="#f4f4f4"
                forecolor="#333"
              />
            </CardBody>
          </Card>
        </Col>
        <Col xl="6" sm="6" md="3">
          <Card>
            <CardHeader>
              <div class="cardTitle">Candidatos a vaga</div>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
