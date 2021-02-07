export const donut = { 
   labels: ['Saúde', 'Automóvel', 'Viagem', 'RC','A. trabalho'],
    plotOptions: {
        pie: {
        size: undefined,
        customScale: 1,
        offsetX: 0,
        offsetY: 0,
        expandOnClick: false,
        dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
        }, 
        donut: {
            size: '65%',
            background: 'transparent',
            labels: {
            show: false,
            name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: undefined,
                offsetY: -10
            },
            value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                 return val
                }
            },
            total: {
                show: false,
                label: 'Total',
                color: '#373d3f',
                formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
                }
            }
            }
        },      
    }
}}

//#region  Lines 

//Single Line Options
export const seriesresponsiveChart= [
    {
      data: [44, 55, 41, 64, 22, 43, 21]
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32]
    }
  ]
export const responsiveChart = {
    chart: {
      width: "100%",
      height: 380,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
   
    xaxis: {
      categories: [
        "Korea",
        "Canada",
        "Poland",
        "Italy",
        "France",
        "Japan",
        "China"
      ]
    },
    legend: {
      position: "right",
      verticalAlign: "top",
      containerMargin: {
        left: 35,
        right: 60
      }
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  }

export const line = {
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
}
//Single Line Options Series
export const serieline = [
    {
        name:"Population",
        data:[
            85504055,
            39971883,
            2720546,
            2296224,
            1567442,
            1563025,
            1469845,
            1300092,
            1026908
        ]
    }
]
//Double Line grafic Options
export const doubleLine = {
    chart: {
        height: 380,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      
      title: {
        text: "Stock Analysis (2009 - 2016)",
        align: "left",
        offsetX: 250
      },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
      },
      yaxis: [
        {
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false,
            color: "#3f51b5"
          },
          labels: {
            style: {
              color: "#3f51b5"
            }
          },
          title: {
            text: "Income (thousand crores)"
          }
        },
    
        {
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false,
            color: "#FFA600"
          },
          labels: {
            show: false,
            style: {
              color: "#FFA600"
            }
          }
        },
        {
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#03a9f4"
          },
          labels: {
            style: {
              color: "#03a9f4"
            }
          },
          title: {
            text: "Revenue (thousand crores)"
          }
        }
      ],
      tooltip: {
        followCursor: true,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y + " thousand crores";
            }
            return y;
          }
        }
      }
}
//Double Line grafic Series
export const serieDoubleLine = [
    {
      name: "Income",
      type: "column",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    },
    {
      name: "Cashflow",
      type: "column",
      data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
    },
    {
      name: "Revenue",
      type: "line",
      data: [20, 29, 37, 36, 44, 45, 50, 58]
    }
  ]

  //#endregion

//#region  Bars
export const bar = {
    chart: {
        width: "100%",
        height: 380,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
     
      xaxis: {
        categories: [
          "Korea",
          "Canada",
          "Poland",
          "Italy",
          "France",
          "Japan",
          "China"
        ]
      },
      legend: {
        position: "right",
        verticalAlign: "top",
        containerMargin: {
          left: 35,
          right: 60
        }
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
}

//radiaBar Progressive
export const radialBar = { 
    chart: {
    height: 280,
    type: "radialBar",
  },
 
  plotOptions: {
    radialBar: {
      dataLabels: {
        total: {
          show: true,
          label: 'TOTAL'
        }
      }
    }
  },
  labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D']
}
export const serieRadialBar = [67, 84, 97, 61]

export const radiaBarRound = {
    chart: {
        height: 280,
        type: "radialBar",
      },
    
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450"
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Progress"]
}

export const serieRadiaBarRound = [67]

export const radialBarProgress ={
    chart: {
      height: 280,
      type: "radialBar"
    },

    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%"
        },
       
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
  
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"]
}
export const serieradialBarProgress = [67]


export const rangeBar = {
           
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: true,
            label: 'TOTAL'
          }
        }
      }
    },
    labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D']
}
export const serieRangeBar = [67, 84, 97, 61]
//#endregion

//#region 
export const pie = {
    labels: ['Saúde', 'Automóvel', 'Viagem', 'RC'],
    plotOptions: {
      
        pie: {
          size: undefined,
          customScale: 1,
          offsetX: 0,
          offsetY: 0,
          expandOnClick: true,
          dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10
          }, 
          donut: {
            size: '65%',
            background: 'transparent',
            labels: {
              show: false,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: undefined,
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val
                }
              },
              total: {
                show: false,
                label: 'Total',
                color: '#373d3f',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                }
              }
            }
          },      
        }
    }
}

export const seriePie = [44, 55, 41, 17, 15]
//#endregion

export const serieGauge = [67]
export const gauge =  {
    chart: {
      height: 280,
      type: "radialBar",
    },
    
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#333',
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "butt"
    },
    labels: ["Progress"]
};

export const area = {
    chart: {
    },
   
    fill: {
      type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan"
      ]
    }
}

export const serieArea =  [
    {
        name: "Series 1",
        data: [45, 52, 38, 45, 19, 23, 2]
    }
]
  