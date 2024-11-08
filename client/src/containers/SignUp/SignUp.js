import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Container, Col, Row } from '../../components/Grid';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  signUpThunk,
  resetSignUp
} from '../sharedActions/authActions';
import { Rotate } from 'react-awesome-reveal';
import { renderError } from '../../utils/renderError';

class SignUp extends Component {

  componentWillUnmount() {
    this.props.resetSignUp();
  }

  handleSubmit = (values, authType = 'default') => {
    // Handle different types of sign-up based on the authType parameter
    switch (authType) {
      case 'google':
        // For server-side OAuth, no action is needed here
        // The user is redirected and authenticated on the server
        break;
      default:
        this.props.signUpThunk(values);
        break;
    }
  };

  render() {
    const { isAuthenticated, signUpError } = this.props;

    if (isAuthenticated) {
      return <Navigate to="/board" replace />;
    }

    return (
      <Container className="pt-5 pb-5">
        <Row className="justify-content-center">
          <Col size="12 md-6 lg-4">
            <Rotate>
              <img
                className="mt-4"
                src="/imgs/icons/lost.svg"
                alt="deer lost in woods"
              />
            </Rotate>
          </Col>
          <Col size="12 md-6 lg-4">
            <h1 className="montserrat mt-5 font-weight-bold">
              Let's help you find your way!
            </h1>
            <h3 className="montserrat mt-1">Make it through the wilderness~</h3>
            <h6 className="montserrat">(of job searching)</h6>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col />
          <Col size="12 md-8 lg-8" className="banana">
            <SignUpForm
              onSubmit={this.handleSubmit}
              errorMessage={renderError(signUpError)}
            />
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signUpError: PropTypes.string,
  signUpThunk: PropTypes.func.isRequired,
  resetSignUp: PropTypes.func.isRequired,
};

// Only need SignUp to be aware of the sign-up state.
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  signUpError: state.auth.signUpError
});

const mapDispatchToProps = {
  signUpThunk,
  resetSignUp
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
