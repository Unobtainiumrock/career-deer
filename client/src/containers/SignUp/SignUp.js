import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Container, Col, Row } from '../../components/Grid';

import { connect } from 'react-redux';
import { signUpThunk, resetSignUp, googleSignUpThunk } from './actions';

import Rotate from 'react-reveal/Rotate';

class SignUp extends Component {
  componentWillUnmount() {
    this.props.resetSignUp();
  }

  handleSubmit = (values, authType = 'default') => {
    // Handle different types of sign-up based on the authType parameter
    switch (authType) {
      case 'google':
        this.props.googleSignUpThunk(values);
        break;
      default:
        this.props.signUpThunk(values);
        break;
    }
  };

  render() {

    if (this.props.app.user) {
      return <Redirect to='/board' />;
    };

    return (
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
                onSubmit={this.handleSubmit}
                errorMessage={renderError(this.props.signedUp)}
              />
            </Col>
            <Col />
          </Row>
        </Container>
    );
  };
};

const renderError = (signedUpState) => {
  if (signedUpState.error) {
    const { response } = signedUpState.error;
    if (response && response.data) {
      const { name, code } = response.data;
      
      switch (name) {
        case "MissingFirstNameError": return "You must enter a first name.";
        case "MissingLastNameError": return "You must enter a last name.";
        case "MissingEmailError": return "You must enter an email.";
        case "MissingPasswordError": return "You must enter a password.";
        default: break;
      }
      if (code === 11000) {
        return "An account with that email already exists. Please choose another email.";
      }
    }
    return "An unexpected error occurred.";
  }
  return ""; // Return an empty string if no error.
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
