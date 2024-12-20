// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from "react-router-dom";
// import { Bar, Line, Doughnut } from 'react-chartjs-2';
// import { getChartAllData } from './actions';
// import { Col, Row, Container } from '../../components/Grid';

// import './Chart.css';
// import Tada from 'react-reveal/Tada';


// class Chart extends Component {

//   componentDidMount() {
//     this.props.getChartAllData();
//   }

//   render() {

//     if (!this.props.app.user){
//       return <Redirect to='/unauthorized' />
//     };

//     return (
//       <Container className="pt-5">
//       <Row className="justify-content-center">
//       <Col size="12 md-12 lg-4" className="mt-5 pt-5">
//       <Tada>
//       <img src="/imgs/icons/charts.svg" alt="deer chart"/>
//       </Tada>
//       </Col>
//       <Col size="12 md-12 lg-8" className="pt-5 mx-auto d-flex flex-wrap">
//         <h1 className="montserrat text-center font-weight-bold w-100">Your Activity Dashboard</h1>
//         <div className="chart mx-auto mb-5">
//           <Line
//             data={{
//               labels: this.props.chartData.all.labels || [],
//               datasets: [{
//                 label: 'User',
//                 fill: false,
//                 data: this.props.chartData.user.percentage || [],
//                 backgroundColor: [
//                   'rgba(0,255,0, 0.7)'
//                 ]
//               }]
//             }}
//             options={{
//               scales: {
//                 yAxes: [{
//                   scaleLabel: {
//                     display: true
//                   },
//                   ticks: {
//                     beginAtZero: true,
//                     callback: (value, index, values) => {
//                       return value + '%';
//                     }
//                   }
//                 }]
//               },
//               title: {
//                 display: true,
//                 text: 'General Progress (%)' + this.props.chartData.sample.title,
//                 fontSize: 20
//               },
//               legend: {
//                 display: true,
//                 position: 'right'
//               },
//               maintainAspectRatio: false
//             }}
//           />
//         </div>
//         </Col>
//         </Row>


//         <Row className="mx-auto mb-5 justify-content-center">
//         <Col size="12 md-10">
//           <h2 className="montserrat text-center font-weight-bold">Percentile Rating</h2>
//         </Col>
//         </Row>
//         <Row className="justify-content-center">
//           <Col size="12 md-6 lg-4" className="chart text-center">
//             <Doughnut
//               data={{
//                 labels: ["# Above You", "# Below You"],
//                 datasets: [
//                   {
//                     data: this.props.chartData.user.percentile.appliedArr  || [],
//                     backgroundColor: [
//                       'rgba(225,225,225, 1)',
//                       'rgba(255,0,0, 1)'
//                     ]
//                   }]
//               }}
//               options={{
//                 title: {
//                   display: true,
//                   text: 'Applied' + this.props.chartData.sample.title,
//                   fontSize: 20
//                 },
//                 legend: {
//                   display: true,
//                   position: 'bottom'
//                 },
//                 maintainAspectRatio: false
//               }}
//             />
//             <Col size="12" className="doughnut-inner">
//               <h4 className="text-center">{this.props.chartData.user.percentile.applied}</h4>
//             </Col>
//           </Col>

//           <Col size="12 md-6 lg-4" className="chart">
//             <Doughnut
//               data={{
//                 labels: ["# Above You", "# Below You"],
//                 datasets: [
//                   {
//                     data: this.props.chartData.user.percentile.phoneArr  || [],
//                     backgroundColor: [
//                       'rgba(225,225,225, 1)',
//                       'rgba(0,255,0, 1)'
//                     ]
//                   }]
//               }}
//               options={{
//                 title: {
//                   display: true,
//                   text: 'Phone' + this.props.chartData.sample.title,
//                   fontSize: 20
//                 },
//                 legend: {
//                   display: true,
//                   position: 'bottom'
//                 },
//                 maintainAspectRatio: false
//               }}
//             />
//             <Col size="12" className="doughnut-inner">
//               <h4 className="text-center">{this.props.chartData.user.percentile.phone}</h4>
//             </Col>
//           </Col>

//           <Col size="12 md-6 lg-4" className="chart">
//             <Doughnut
//               data={{
//                 labels: ["# Above You", "# Below You"],
//                 datasets: [
//                   {
//                     data: this.props.chartData.user.percentile.onSiteArr  || [],
//                     backgroundColor: [
//                       'rgba(225,225,225, 1)',
//                       'rgba(255,255,0, 1)'
//                     ]
//                   }]
//               }}
//               options={{
//                 title: {
//                   display: true,
//                   text: 'On-Site' + this.props.chartData.sample.title,
//                   fontSize: 20
//                 },
//                 legend: {
//                   display: true,
//                   position: 'bottom'
//                 },
//                 maintainAspectRatio: false
//               }}
//             />
//             <Col size="12" className="doughnut-inner">
//               <h4 className="text-center">{this.props.chartData.user.percentile.onSite}</h4>
//             </Col>
//           </Col>
//         </Row>

//         <Row className="justify-content-center mx-auto my-5">
//         <Col size="12 md-10">
//         <h2 className="text-center montserrat font-weight-bold">Employment Progress</h2>
//         </Col>
//         </Row>
//         <Row className="justify-content-center">
//           <Col size="12 md-6 lg-5" className="chart">
//             <Bar
//               data={{
//                 labels: this.props.chartData.all.labels || [],
//                 datasets: [{
//                   label: 'Database',
//                   data: this.props.chartData.all.data || [],
//                   backgroundColor: [
//                     'rgba(0,47,178, 0.7)',
//                     'rgba(255,0,0, 0.7)',
//                     'rgba(0,255,0, 0.7)',
//                     'rgba(255,255,0, 0.7)',
//                     'rgba(40,40,40, 0.7)'
//                   ]
//                 }]
//               }}
//               options={{
//                 scales: {
//                   yAxes: [{
//                     scaleLabel: {
//                       display: true,
//                       labelString: 'Number of Jobs'
//                     },
//                     ticks: {
//                       beginAtZero: true,
//                       callback: function (value, index, values, radix) {
//                         //converting y-axis number to include commas.
//                         if (parseInt(value, radix) >= 1000) {
//                           return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         } else {
//                           return value;
//                         }
//                       }
//                     }
//                   }]
//                 },
//                 title: {
//                   display: true,
//                   text: 'Userbase' + this.props.chartData.sample.title,
//                   fontSize: 20
//                 },
//                 legend: {
//                   display: false,
//                   position: 'right'
//                 },
//                 maintainAspectRatio: false
//               }}
//             />
//           </Col>

//           <Col size="12 md-6 lg-5" className="chart">
//             <Bar
//               data={{
//                 labels: this.props.chartData.all.labels || [],
//                 datasets: [
//                   {
//                     // label: 'Users',
//                     data: this.props.chartData.user.data || [],
//                     backgroundColor: [
//                       'rgba(0,47,178, 0.7)',
//                       'rgba(255,0,0, 0.7)',
//                       'rgba(0,255,0, 0.7)',
//                       'rgba(255,255,0, 0.7)',
//                       'rgba(40,40,40, 0.7)'
//                     ]
//                   }]
//               }}
//               options={{
//                 scales: {
//                   yAxes: [{
//                     scaleLabel: {
//                       display: true,
//                       labelString: 'Number of Jobs'
//                     },
//                     ticks: {
//                       beginAtZero: true,
//                       callback: function (value, index, values, radix) {
//                         //converting y-axis number to include commas.
//                         if (parseInt(value, radix) >= 1000) {
//                           return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         } else {
//                           return value;
//                         }
//                       }
//                     }
//                   }]
//                 },
//                 title: {
//                   display: true,
//                   text: 'Your Progress' + this.props.chartData.sample.title,
//                   fontSize: 20
//                 },
//                 legend: {
//                   display: false,
//                   position: 'right'
//                 },
//                 maintainAspectRatio: false
//               }}
//             />
//           </Col>
//         </Row>

//         <Row className="justify-content-center">
//         <Col size="12 md-10" className="chart mx-auto mb-5">
//           <Bar
//             data={{
//               labels: this.props.chartData.all.labels || [],
//               datasets: [
//                 {
//                   label: 'Database',
//                   data: this.props.chartData.all.percentage || [],
//                   backgroundColor: [
//                     'rgba(0,47,178, 0.7)',
//                     'rgba(0,47,178, 0.7)',
//                     'rgba(0,47,178, 0.7)',
//                     'rgba(0,47,178, 0.7)',
//                     'rgba(0,47,178, 0.7)'
//                   ]
//                 },
//                 {
//                   label: 'User',
//                   data: this.props.chartData.user.percentage || [],
//                   backgroundColor: [
//                     'rgba(0,255,0, 0.7)',
//                     'rgba(0,255,0, 0.7)',
//                     'rgba(0,255,0, 0.7)',
//                     'rgba(0,255,0, 0.7)',
//                     'rgba(0,255,0, 0.7)'
//                   ]
//                 }]
//             }}
//             options={{
//               scales: {
//                 yAxes: [{
//                   scaleLabel: {
//                     display: true
//                   },
//                   ticks: {
//                     beginAtZero: true,
//                     callback: (value, index, values) => {
//                       return value + '%';
//                     }
//                   }
//                 }]
//               },
//               title: {
//                 display: true,
//                 text: 'Your Comparison with Userbase' + this.props.chartData.sample.title,
//                 fontSize: 20
//               },
//               legend: {
//                 display: true,
//                 position: 'right'
//               },
//               maintainAspectRatio: false
//             }}
//           />
//         </Col>
//         </Row>

//       </Container>

//     )
//   }
// }

// function mapStateToProps(state) {
//   return {
//     chartData: state.chartData,
//     app: state.app
//   }
// }

// const mapDispatchToProps = (dispatch, props) => ({
//   getChartAllData
// })

// export default connect(mapStateToProps, mapDispatchToProps())(Chart);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { Bar, Line, Doughnut } from 'react-chartjs-2';
// import { getChartAllData } from './actions';
// import { Col, Row, Container } from '../../components/Grid';

// import './Chart.css';
// import { AttentionSeeker } from 'react-awesome-reveal'; // Updated import

// class Chart extends Component {
//   componentDidMount() {
//     this.props.getChartAllData();
//   }

//   render() {
//     if (!this.props.app.user) {
//       return <Redirect to="/unauthorized" />;
//     }

//     return (
//       <Container className="pt-5">
//         <Row className="justify-content-center">
//           <Col size="12 md-12 lg-4" className="mt-5 pt-5">
//             <AttentionSeeker effect="tada">
//               <img src="/imgs/icons/charts.svg" alt="deer chart" />
//             </AttentionSeeker>
//           </Col>
//           <Col size="12 md-12 lg-8" className="pt-5 mx-auto d-flex flex-wrap">
//             <h1 className="montserrat text-center font-weight-bold w-100">
//               Your Activity Dashboard
//             </h1>
//             <div className="chart mx-auto mb-5">
//               <Line
//                 data={{
//                   labels: this.props.chartData.all.labels || [],
//                   datasets: [
//                     {
//                       label: 'User',
//                       fill: false,
//                       data: this.props.chartData.user.percentage || [],
//                       backgroundColor: ['rgba(0,255,0, 0.7)'],
//                     },
//                   ],
//                 }}
//                 options={{
//                   scales: {
//                     yAxes: [
//                       {
//                         scaleLabel: {
//                           display: true,
//                         },
//                         ticks: {
//                           beginAtZero: true,
//                           callback: (value) => {
//                             return value + '%';
//                           },
//                         },
//                       },
//                     ],
//                   },
//                   title: {
//                     display: true,
//                     text:
//                       'General Progress (%)' +
//                       (this.props.chartData.sample?.title || ''),
//                     fontSize: 20,
//                   },
//                   legend: {
//                     display: true,
//                     position: 'right',
//                   },
//                   maintainAspectRatio: false,
//                 }}
//               />
//             </div>
//           </Col>
//         </Row>

//         {/* Rest of the component remains the same */}

//         {/* ... Include the rest of your component code here ... */}

//       </Container>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     chartData: state.chartData,
//     app: state.app,
//   };
// }

// const mapDispatchToProps = {
//   getChartAllData,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Chart);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { getChartAllData } from './actions';
import { Col, Row, Container } from '../../components/Grid';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import './Chart.css';
import { AttentionSeeker } from 'react-awesome-reveal'; // Updated import

class Chart extends Component {
  componentDidMount() {
    this.props.getChartAllData();
  }

  render() {
    const { auth, chartData } = this.props;

    if (!auth.isAuthenticated) {
      return <Navigate to="/unauthorized" replace />;
    }

    return (
      <Container className="pt-5">
        <Row className="justify-content-center">
          <Col size="12 md-12 lg-4" className="mt-5 pt-5">
            <AttentionSeeker effect="tada">
              <img src="/imgs/icons/charts.svg" alt="charts" />
            </AttentionSeeker>
          </Col>
          <Col size="12 md-12 lg-8" className="pt-5 mx-auto d-flex flex-wrap">
            <h1 className="montserrat text-center font-weight-bold w-100">
              Your Activity Dashboard
            </h1>
            <div className="chart mx-auto mb-5">
              <Line
                data={{
                  labels: chartData.all.labels || [],
                  datasets: [
                    {
                      label: 'User',
                      fill: false,
                      data: chartData.user.percentage || [],
                      backgroundColor: ['rgba(0,255,0, 0.7)'],
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `${value}%`,
                      },
                    },
                  },
                  plugins: {
                    title: {
                      display: true,
                      text:
                        'General Progress (%)' +
                        (chartData.sample?.title || ''),
                      font: {
                        size: 20,
                      },
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </Col>
        </Row>

        {/* Percentile Rating Section */}
        <Row className="mx-auto mb-5 justify-content-center">
          <Col size="12 md-10">
            <h2 className="montserrat text-center font-weight-bold">
              Percentile Rating
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {/* Applied Doughnut Chart */}
          <Col size="12 md-6 lg-4" className="chart text-center">
            <Doughnut
              data={{
                labels: ['# Above You', '# Below You'],
                datasets: [
                  {
                    data: chartData.user.percentile.appliedArr || [],
                    backgroundColor: [
                      'rgba(225,225,225, 1)',
                      'rgba(255,0,0, 1)',
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Applied' + (chartData.sample?.title || ''),
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                },
                maintainAspectRatio: false,
              }}
            />
            <Col size="12" className="doughnut-inner">
              <h4 className="text-center">
                {chartData.user.percentile.applied}
              </h4>
            </Col>
          </Col>

          {/* Phone Doughnut Chart */}
          <Col size="12 md-6 lg-4" className="chart">
            <Doughnut
              data={{
                labels: ['# Above You', '# Below You'],
                datasets: [
                  {
                    data: chartData.user.percentile.phoneArr || [],
                    backgroundColor: [
                      'rgba(225,225,225, 1)',
                      'rgba(0,255,0, 1)',
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Phone' + (chartData.sample?.title || ''),
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                },
                maintainAspectRatio: false,
              }}
            />
            <Col size="12" className="doughnut-inner">
              <h4 className="text-center">
                {chartData.user.percentile.phone}
              </h4>
            </Col>
          </Col>

          {/* On-Site Doughnut Chart */}
          <Col size="12 md-6 lg-4" className="chart">
            <Doughnut
              data={{
                labels: ['# Above You', '# Below You'],
                datasets: [
                  {
                    data: chartData.user.percentile.onSiteArr || [],
                    backgroundColor: [
                      'rgba(225,225,225, 1)',
                      'rgba(255,255,0, 1)',
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'On-Site' + (chartData.sample?.title || ''),
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                },
                maintainAspectRatio: false,
              }}
            />
            <Col size="12" className="doughnut-inner">
              <h4 className="text-center">
                {chartData.user.percentile.onSite}
              </h4>
            </Col>
          </Col>
        </Row>

        {/* Employment Progress Section */}
        <Row className="justify-content-center mx-auto my-5">
          <Col size="12 md-10">
            <h2 className="text-center montserrat font-weight-bold">
              Employment Progress
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {/* Database Bar Chart */}
          <Col size="12 md-6 lg-5" className="chart">
            <Bar
              data={{
                labels: chartData.all.labels || [],
                datasets: [
                  {
                    label: 'Database',
                    data: chartData.all.data || [],
                    backgroundColor: [
                      'rgba(0,47,178, 0.7)',
                      'rgba(255,0,0, 0.7)',
                      'rgba(0,255,0, 0.7)',
                      'rgba(255,255,0, 0.7)',
                      'rgba(40,40,40, 0.7)',
                    ],
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Jobs',
                    },
                    ticks: {
                      callback: function (value) {
                        if (parseInt(value, 10) >= 1000) {
                          return value
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        } else {
                          return value;
                        }
                      },
                    },
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Userbase' + (chartData.sample?.title || ''),
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    display: false,
                    position: 'right',
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </Col>

          {/* User Progress Bar Chart */}
          <Col size="12 md-6 lg-5" className="chart">
            <Bar
              data={{
                labels: chartData.all.labels || [],
                datasets: [
                  {
                    label: 'User',
                    data: chartData.user.data || [],
                    backgroundColor: [
                      'rgba(0,47,178, 0.7)',
                      'rgba(255,0,0, 0.7)',
                      'rgba(0,255,0, 0.7)',
                      'rgba(255,255,0, 0.7)',
                      'rgba(40,40,40, 0.7)',
                    ],
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Jobs',
                    },
                    ticks: {
                      callback: function (value) {
                        if (parseInt(value, 10) >= 1000) {
                          return value
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        } else {
                          return value;
                        }
                      },
                    },
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Your Progress' + (chartData.sample?.title || ''),
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    display: false,
                    position: 'right',
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </Col>
        </Row>

        {/* Comparison Bar Chart */}
        <Row className="justify-content-center">
          <Col size="12 md-10" className="chart mx-auto mb-5">
            <Bar
              data={{
                labels: chartData.all.labels || [],
                datasets: [
                  {
                    label: 'Database',
                    data: chartData.all.percentage || [],
                    backgroundColor: Array(5).fill('rgba(0,47,178, 0.7)'),
                  },
                  {
                    label: 'User',
                    data: chartData.user.percentage || [],
                    backgroundColor: Array(5).fill('rgba(0,255,0, 0.7)'),
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text:
                      'Your Comparison with Userbase' +
                      (chartData.sample?.title || ''),
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  chartData: state.chartData,
  auth: state.auth, // Updated to use 'auth'
});

const mapDispatchToProps = {
  getChartAllData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
