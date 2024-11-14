import React from 'react';
import { connect } from 'react-redux';
import Menu from './react-burger-menu/elastic';
import { Link, useNavigate } from 'react-router-dom';
import './BurgerMenu.css';
import { toggleMenu } from '../../containers/BurgerMenu/actions';
import { logoutThunk } from '../../containers/sharedActions/authActions';
import PropTypes from 'prop-types';

const BurgerMenu = ({
  isOpen,
  firstName,
  lastName,
  toggleMenu,
  logoutThunk
}) => {
  const navigate = useNavigate();

  const closeMenu = () => {
    toggleMenu(false);
  };

  const executeLogout = async () => {
    await logoutThunk();
    navigate('/');
  };

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={(state) => toggleMenu(state.isOpen)}
      outerContainerId="outer-container"
      pageWrapId="page-wrap"
    >
      <img
        width="50px"
        className="text-center my-3"
        src="/imgs/logo-white.svg"
        alt="menu logo"
      />

      <h3 className="pb-0">
        Hello {`${firstName} ${lastName}`}!
      </h3>
      <Link
        to="/board"
        className="menu-item font-weight-bold mt-5 mb-3"
        onClick={closeMenu}
      >
        <i className="fab fa-trello"></i> &nbsp; &nbsp; Job Tracker Board
      </Link>
      <Link to="/addjob" className="menu-item" onClick={closeMenu}>
        <i className="fas fa-plus-circle"></i> &nbsp; &nbsp; Track new Job
      </Link>
      <Link to="/search" className="menu-item" onClick={closeMenu}>
        <i className="fas fa-search"></i> &nbsp; &nbsp; Search for Jobs
      </Link>
      <Link to="/chart" className="menu-item mb-3" onClick={closeMenu}>
        <i className="fas fa-chart-bar"></i> &nbsp; &nbsp; Progress Charts
      </Link>
      <p
        className="menu-item mt-5"
        onClick={() => {
          closeMenu();
          executeLogout();
        }}
      >
        <i className="fas fa-sign-out-alt"></i> &nbsp; &nbsp; Logout
      </p>
    </Menu>
  );
};

BurgerMenu.propTypes = {
  isOpen: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
  logoutThunk: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: state.burgerMenu.isOpen,
  firstName: state.auth.user?.firstName || 'Stray',
  lastName: state.auth.user?.lastName || 'Deer',
});

const mapDispatchToProps = {
  toggleMenu,
  logoutThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
