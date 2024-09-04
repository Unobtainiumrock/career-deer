import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Container, Col, Row } from '../../components/Grid';

import { connect } from 'react-redux';
import { signUpThunk, resetSignUp, googleSignUpThunk } from './actions';

import Rotate from 'react-reveal/Rotate';

class SignUp extends Component {
  signUp = (values, authType) => {
    if (!(values === null)) {
      this.props.signUpThunk(values);
    } else {
      switch (authType) {
        default:
          this.props.signUpThunk(values);
          break;
        // case 'google':
        //   console.log('Log in with Google');
        //   this.props.googleSignUpThunk(values);
        //   break;
        // case 'facebook':
        //   console.log('Log in with Facebook');
        //   // this.props.faceBookSignUpthunk(values);
        //   break;
        // case 'github':
        //   console.log('Log in with GitHub');
        //   // this.props.githubSignUpThunk(values);
        //   break;
        // default:
        //   console.warn(`Unhandled authentication type: ${authType}`);
        //   break;
      }
    }
  };

  componentWillUnmount() {
    this.props.resetSignUp();
    console.log('componentWillMount: this.props.resetSignUp invoked!');
  }

  render() {
    if (this.props.app.user) {
      return <Redirect to='/board' />;
    };

    return (
      <React.Fragment>
        <Container className="pt-5 pb-5">
          <Row className="justify-content-center">
            <Col size="12 md-6 lg-4">
              <Rotate>
                <img className="mt-4" src="/imgs/icons/lost.svg" alt="deer lost in woods" />
              </Rotate>
            </Col>
            <Col size="12 md-6 lg-4">
              <h1 className="montserrat mt-5 font-weight-bold">Let's help you find your way!</h1>
              <h3 className="montserrat mt-1">Make it through the wilderness~</h3>
              <h6 className="montserrat">(of job searching)</h6>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col />
            <Col size="12 md-8 lg-8" className="banana">
              <SignUpForm
                onSubmit={this.signUp}
                errorMessage={renderError(this.props.signedUp, this.props.app)}
              />
            </Col>
            <Col />
          </Row>
        </Container>
        {/* <div>{this.props.renderMaterial}</div> */}
      </React.Fragment>
    );
  };
};

const renderError = (signedUpState, appState) => {
  if (!appState.user && signedUpState.error?.response?.data) {
    const { name, code } = signedUpState.error.response.data;
    
    if (name === "MissingFirstNameError") 
      return "You must enter a first name.";
    if (name === "MissingLastNameError") 
      return "You must enter a last name.";
    if (name === "MissingEmailError") 
      return "You must enter an email.";
    if (name === "MissingPasswordError") 
      return "You must enter a password.";
    if (code === 11000) 
      return "An account with that email already exists. Please choose another email.";
  }
};


// Only need SignUp to be aware of the sign up state.
const mapStateToProps = (state, props) => {
  return {
    signedUp: state.signedUp,
    app: state.app
    // renderMaterial: state.auth.renderMaterial
  };
};

const mapDispatchProps = (dispatch, props) => ({
  signUpThunk,
  resetSignUp,
  googleSignUpThunk
});

export default connect(mapStateToProps, mapDispatchProps())(SignUp);
