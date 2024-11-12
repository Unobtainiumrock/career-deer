import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Container, Col, Row } from '../../components/Grid';
import { connect } from 'react-redux';
import { loginThunk, resetLogin } from '../sharedActions/authActions';
import './Login.css';
import { Bounce } from 'react-awesome-reveal';
import { renderError } from '../../utils/renderError';
import PropTypes from 'prop-types';

class LoginPage extends Component {

  componentWillUnmount() {
    this.props.resetLogin();
  }

  handleLogin = (values) => {
    // Dispatch the loginThunk with form values
    this.props.loginThunk(values);
  };

  render() {
    const { isAuthenticated, loginError } = this.props;

    if (isAuthenticated) {
      return <Navigate to="/board" replace />;
    }

    return (
      <React.Fragment>
        <Container className="pt-5 pb-5">
          <Row className="justify-content-center">
            <Col size="12 md-6 lg-4">
              <Bounce>
                <img
                  className="mt-4"
                  // src="/imgs/icons/login.svg"
                  alt="login illustration"
                />
              </Bounce>
            </Col>
            <Col size="12 md-6 lg-4">
              <h1 className="montserrat mt-5 font-weight-bold">Welcome Back!</h1>
              <h3 className="montserrat mt-1">Log in to continue</h3>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col />
            <Col size="12 md-8 lg-8" className="banana">
              <LoginForm
                onSubmit={this.handleLogin}
                errorMessage={renderError(loginError)}
              />
            </Col>
            <Col />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginError: PropTypes.string,
  loginThunk: PropTypes.func.isRequired,
  resetLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.loginError
});

const mapDispatchToProps = {
  loginThunk,
  resetLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
