// import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
// import LoginForm from '../../components/LoginForm/LoginForm';
// import { Container, Col, Row } from '../../components/Grid';

// import { connect } from 'react-redux';
// import { login, resetLoginState } from './actions';
// import './Login.css';

// import Bounce from 'react-reveal/Bounce';

// class LoginPage extends Component {
//   login = values => {
//     // This calls the login action creator, passing the form values to it
//     this.props.login(values);
//   };

//   reset() {
//     this.props.resetLoginState();
//   };

//   componentWillUnmount() {
//     this.reset();
//   }

//   render() {

//     if (this.props.app.user){
//       return <Redirect to='/board' />
//     };

//     return (
//       <React.Fragment>
//         <Container className="pt-5 pb-5">
//           <Row className="justify-content-center">
//             <Col size="12 md-8">
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col size="12 md-6 lg-5">
//               <Bounce top duration={2000}>
//                 <a href="/auth/google">
//                   <img className="img-fluid" src="/imgs/icons/studying.svg" alt="empty desk" />
//                 </a>
//               </Bounce>
//             </Col>
//             <Col size="12 md-6 lg-6" className="log-in">
//               <h1 className="text-center mt-5 montserrat font-weight-bold">Welcome Back!</h1>
//               <h2 className="text-center mt-2 montserrat">Let's get you on track</h2>
//               <LoginForm onSubmit={this.login} errorMessage={renderError(this.props.loggedIn, this.props.app)} />
//             </Col>
//           </Row>
//         </Container>
//       </React.Fragment>
//     );
//   };
// };

// const renderError = (loggedInState, appState) => {
//   if (!appState.user && loggedInState.error)
//     return "Incorrect email or password.";
//   else
//     return "";
// };

// // LoginPage needs to be aware of the signedUp state
// const mapStateToProps = (state, props) => {
//   return {
//     loggedIn: state.loggedIn,
//     app: state.app
//   };
// };

// const mapDispatchToProps = (dispatch, props) => ({
//   login,
//   resetLoginState
// });

// export default connect(mapStateToProps, mapDispatchToProps())(LoginPage);

// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import LoginForm from '../../components/LoginForm/LoginForm';
// import { Container, Col, Row } from '../../components/Grid';

// import { connect } from 'react-redux';
// import { login, resetLoginState } from './actions';
// import './Login.css';

// import { Bounce } from 'react-awesome-reveal'; // Updated import

// class LoginPage extends Component {
//   login = (values) => {
//     this.props.login(values);
//   };

//   reset() {
//     this.props.resetLoginState();
//   }

//   componentWillUnmount() {
//     this.reset();
//   }

//   render() {
//     if (this.props.app.user) {
//       return <Redirect to="/board" />;
//     }

//     return (
//       <React.Fragment>
//         <Container className="pt-5 pb-5">
//           <Row className="justify-content-center">
//             <Col size="12 md-8"></Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col size="12 md-6 lg-5">
//               <Bounce direction="top" duration={2000}>
//                 <a href="/auth/google">
//                   <img
//                     className="img-fluid"
//                     src="/imgs/icons/studying.svg"
//                     alt="empty desk"
//                   />
//                 </a>
//               </Bounce>
//             </Col>
//             <Col size="12 md-6 lg-6" className="log-in">
//               <h1 className="text-center mt-5 montserrat font-weight-bold">
//                 Welcome Back!
//               </h1>
//               <h2 className="text-center mt-2 montserrat">
//                 Let's get you on track
//               </h2>
//               <LoginForm
//                 onSubmit={this.login}
//                 errorMessage={renderError(this.props.loggedIn, this.props.app)}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </React.Fragment>
//     );
//   }
// }

// const renderError = (loggedInState, appState) => {
//   if (!appState.user && loggedInState.error) {
//     return 'Incorrect email or password.';
//   } else {
//     return '';
//   }
// };

// const mapStateToProps = (state) => {
//   return {
//     loggedIn: state.loggedIn,
//     app: state.app,
//   };
// };

// const mapDispatchToProps = {
//   login,
//   resetLoginState,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import LoginForm from '../../components/LoginForm/LoginForm';
// import { Container, Col, Row } from '../../components/Grid';

// import { connect } from 'react-redux';
// import { login, resetLoginState } from './actions';
// import './Login.css';

// import { Bounce } from 'react-awesome-reveal';

// class LoginPage extends Component {
//   login = (values) => {
//     // Dispatch the login action with form values
//     this.props.login(values);
//   };

//   reset() {
//     // Reset the login state
//     this.props.resetLoginState();
//   }

//   componentWillUnmount() {
//     this.reset();
//   }

//   render() {
//     if (this.props.app.user) {
//       return <Redirect to="/board" />;
//     }

//     return (
//       <React.Fragment>
//         <Container className="pt-5 pb-5">
//           <Row className="justify-content-center">
//             <Col size="12 md-8"></Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col size="12 md-6 lg-5">
//               <Bounce direction="top" duration={2000}>
//                 <a href="/auth/google">
//                   <img
//                     className="img-fluid"
//                     src="/imgs/icons/studying.svg"
//                     alt="empty desk"
//                   />
//                 </a>
//               </Bounce>
//             </Col>
//             <Col size="12 md-6 lg-6" className="log-in">
//               <h1 className="text-center mt-5 montserrat font-weight-bold">
//                 Welcome Back!
//               </h1>
//               <h2 className="text-center mt-2 montserrat">
//                 Let's get you on track
//               </h2>
//               <LoginForm
//                 onSubmit={this.login}
//                 errorMessage={renderError(this.props.loggedIn, this.props.app)}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </React.Fragment>
//     );
//   }
// }

// const renderError = (loggedInState, appState) => {
//   if (!appState.user && loggedInState.error) {
//     return 'Incorrect email or password.';
//   } else {
//     return '';
//   }
// };

// const mapStateToProps = (state) => ({
//   loggedIn: state.loggedIn,
//   app: state.app,
// });

// const mapDispatchToProps = {
//   login,
//   resetLoginState,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Container, Col, Row } from '../../components/Grid';

import { connect } from 'react-redux';
import { login, resetLoginState } from './actions';
import './Login.css';

import { Bounce } from 'react-awesome-reveal';

class LoginPage extends Component {
  login = (values) => {
    // Dispatch the login action with form values
    this.props.login(values);
  };

  reset() {
    // Reset the login state
    this.props.resetLoginState();
  }

  componentWillUnmount() {
    this.reset();
  }

  render() {
    if (this.props.app.user) {
      return <Navigate to="/board" replace />;
    }

    return (
      <React.Fragment>
        <Container className="pt-5 pb-5">
          {/* ... Rest of your component remains unchanged ... */}
        </Container>
      </React.Fragment>
    );
  }
}

const renderError = (loggedInState, appState) => {
  if (!appState.user && loggedInState.error) {
    return 'Incorrect email or password.';
  } else {
    return '';
  }
};

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  app: state.app,
});

const mapDispatchToProps = {
  login,
  resetLoginState,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
