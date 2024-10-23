// import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
// import AddJobForm from '../../components/AddJobForm/AddJobForm';
// import { Container, Col, Row } from '../../components/Grid';

// import { connect } from 'react-redux';
// // import { Cookies } from 'react-cookie';
// import { addjob, resetaddjob } from './actions';

// import RubberBand from 'react-reveal/RubberBand';

// class AddJob extends Component {
//   // cookies = new Cookies() ;
  
//   addjob = values => {
//     // This calls the addjob action creator, passing the form values to it
//    this.props.addjob(values);
//   }

//   render() {
//     if (this.props.addJob.status) {
//       this.props.resetaddjob();
//       return <Redirect to='/board' />;
//     };

//     if (!this.props.app.user) {
//       return <Redirect to='/unauthorized' />
//     }

//     return (
//       <Container className="pt-5">
//         <Row className="justify-content-center text-center">
//         <Col size = "12 lg-10">
//         <RubberBand>
//         <img width="80%" src="/imgs/icons/walking.svg" alt="hunt the deer"/>
//         </RubberBand>
//         </Col>
//         </Row>
//         <Row>
//           <Col className="text-center">
//             <h3 className="montserrat font-weight-bold mt-3">Track a New Job</h3>
//             <h6>Found a job from somewhere else? Import it here and you'll be able to track your progress!</h6>
//           </Col>
//         </Row>
//         <AddJobForm onSubmit={this.addjob} />

//       </Container>
//     );
//   };
// };

// const mapStateToProps = (state,props) => {
//   return { 
//     addJob: state.addJob,
//     app: state.app
//   }
// };

// const mapDispatchToProps = (dispatch,props) => ({
//   addjob,
//   resetaddjob
// })

// export default connect(mapStateToProps,mapDispatchToProps())(AddJob);

// import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
// import AddJobForm from '../../components/AddJobForm/AddJobForm';
// import { Container, Col, Row } from '../../components/Grid';

// import { connect } from 'react-redux';
// // import { Cookies } from 'react-cookie';
// import { addjob, resetaddjob } from './actions';

// import { AttentionSeeker } from 'react-awesome-reveal'; // Updated import

// class AddJob extends Component {
//   // cookies = new Cookies() ;

//   addjob = (values) => {
//     // This calls the addjob action creator, passing the form values to it
//     this.props.addjob(values);
//   };

//   render() {
//     if (this.props.addJob.status) {
//       this.props.resetaddjob();
//       return <Redirect to="/board" />;
//     }

//     if (!this.props.app.user) {
//       return <Redirect to="/unauthorized" />;
//     }

//     return (
//       <Container className="pt-5">
//         <Row className="justify-content-center text-center">
//           <Col size="12 lg-10">
//             <AttentionSeeker effect="rubberBand">
//               <img
//                 width="80%"
//                 src="/imgs/icons/walking.svg"
//                 alt="hunt the deer"
//               />
//             </AttentionSeeker>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="text-center">
//             <h3 className="montserrat font-weight-bold mt-3">
//               Track a New Job
//             </h3>
//             <h6>
//               Found a job from somewhere else? Import it here and you'll be able
//               to track your progress!
//             </h6>
//           </Col>
//         </Row>
//         <AddJobForm onSubmit={this.addjob} />
//       </Container>
//     );
//   }
// }

// const mapStateToProps = (state, props) => {
//   return {
//     addJob: state.addJob,
//     app: state.app,
//   };
// };

// const mapDispatchToProps = {
//   addjob,
//   resetaddjob,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AddJob);

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'; // Updated import
import AddJobForm from '../../components/AddJobForm/AddJobForm';
import { Container, Col, Row } from '../../components/Grid';

import { connect } from 'react-redux';
import { addjob, resetaddjob } from './actions';

import { AttentionSeeker } from 'react-awesome-reveal'; // Updated import

class AddJob extends Component {
  // If you plan to use cookies in the future, uncomment the line below
  // cookies = new Cookies();

  addjob = (values) => {
    // This calls the addjob action creator, passing the form values to it
    this.props.addjob(values);
  };

  componentDidUpdate(prevProps) {
    // If the addJob.status has changed from false to true, reset it and navigate
    if (!prevProps.addJob.status && this.props.addJob.status) {
      this.props.resetaddjob();
    }
  }

  render() {
    // If the add job action was successful, navigate to the board
    if (this.props.addJob.status) {
      return <Navigate to="/board" replace />;
    }

    // If the user is not authenticated, navigate to the unauthorized page
    if (!this.props.app.user) {
      return <Navigate to="/unauthorized" replace />;
    }

    return (
      <Container className="pt-5">
        <Row className="justify-content-center text-center">
          <Col size="12 lg-10">
            <AttentionSeeker effect="rubberBand">
              <img
                width="80%"
                src="/imgs/icons/walking.svg"
                alt="hunt the deer"
              />
            </AttentionSeeker>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3 className="montserrat font-weight-bold mt-3">
              Track a New Job
            </h3>
            <h6>
              Found a job from somewhere else? Import it here and you'll be able
              to track your progress!
            </h6>
          </Col>
        </Row>
        <AddJobForm onSubmit={this.addjob} />
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  addJob: state.addJob,
  app: state.app,
});

const mapDispatchToProps = {
  addjob,
  resetaddjob,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
