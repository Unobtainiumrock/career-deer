// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { postResetPassword, resetPasswordReset } from './actions';
// import ResetPWForm from '../../components/ResetPWForm';
// import Bounce from 'react-reveal/Bounce';
// import Slide from 'react-reveal/Slide';
// import { Link } from 'react-router-dom';

// import { Col, Row, Container } from '../../components/Grid';

// class ResetPW extends Component {

//     componentDidMount() {
//         this.props.resetPasswordReset();
//     }

//     requestPWReset = values => {
//         this.props.postResetPassword(values);
//     }

//     render() {
//         if (this.props.pwReset.status) {
//             return (
//             <Slide left>
//                 <Container>
//                     <Row className="justify-content-center text-center pt-5 mx-0 px-0">
//                         <Col size="12 md-10">                          
//                                 <img className="my-4" width="30%" src="/imgs/icons/send.svg" alt="sending" />
//                         </Col>
//                     </Row>
//                     <Row className="justify-content-center text-center">
//                         <Col className="montserrat">
//                            <h3>An email has been sent for a link to reset your password.</h3>
//                            <h4>Click <Link to="/login">here</Link> to return back to the herd</h4>
//                         </Col>
//                     </Row>
//                 </Container>
//             </Slide>
//             )
//         } else {
//             return (
//                 <Container>
//                     <Row className="justify-content-center text-center pt-5 mx-0 px-0">
//                         <Col size="12 md-10">
//                             <Bounce>
//                                 <img className="my-4" width="35%" src="/imgs/icons/question.svg" alt="forgot your password?" />
//                             </Bounce>
//                         </Col>
//                     </Row>
//                     <ResetPWForm onSubmit={this.requestPWReset} />
//                 </Container>
//             )
//         }
//     }
// }


// const mapStateToProps = (state, props) => {
//     return {
//         pwReset: state.pwReset,
//         app: state.app
//     }
// }

// const mapDispatchToProps = (dispatch, props) => ({
//     postResetPassword,
//     resetPasswordReset
// })

// export default connect(mapStateToProps, mapDispatchToProps())(ResetPW);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { postResetPassword, resetPasswordReset } from './actions';
import ResetPWForm from '../../components/ResetPWForm';
import { Col, Row, Container } from '../../components/Grid';

class ResetPW extends Component {
  componentDidMount() {
    this.props.resetPasswordReset();
  }

  requestPWReset = values => {
    this.props.postResetPassword(values);
  }

  render() {
    if (this.props.pwReset.status) {
      return (
        <motion.div initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 50 }}>
          <Container>
            <Row className="justify-content-center text-center pt-5 mx-0 px-0">
              <Col size="12 md-10">
                <img className="my-4" width="30%" src="/imgs/icons/send.svg" alt="sending" />
              </Col>
            </Row>
            <Row className="justify-content-center text-center">
              <Col className="montserrat">
                <h3>An email has been sent for a link to reset your password.</h3>
                <h4>Click <Link to="/login">here</Link> to return back to the herd</h4>
              </Col>
            </Row>
          </Container>
        </motion.div>
      );
    } else {
      return (
        <Container>
          <Row className="justify-content-center text-center pt-5 mx-0 px-0">
            <Col size="12 md-10">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 60 }}>
                <img className="my-4" width="35%" src="/imgs/icons/question.svg" alt="forgot your password?" />
              </motion.div>
            </Col>
          </Row>
          <ResetPWForm onSubmitForm={this.requestPWReset} errorMessage={this.props.pwReset.error} />
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  pwReset: state.pwReset,
  app: state.app
});

const mapDispatchToProps = {
  postResetPassword,
  resetPasswordReset
};

export default connect(mapStateToProps, mapDispatchToProps())(ResetPW);
