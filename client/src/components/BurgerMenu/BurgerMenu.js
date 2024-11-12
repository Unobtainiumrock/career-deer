import React from 'react';
import { connect } from 'react-redux';
import { elastic as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import { logOut } from '../../utils/API';
import { toggleMenu } from '../../containers/BurgerMenu/actions';

const BurgerMenu = ({
  isOpen = false,
  firstName = '',
  lastName = '',
  toggleMenu
}) => {
  const executeLogout = async () => {
    await logOut();
    window.location.pathname = '/';
  };

  const handleStateChange = (state) => {
    toggleMenu(state.isOpen);
  };

  const closeMenu = () => {
    toggleMenu(false);
  };

  return (
    <Menu 
      isOpen={isOpen}
      onStateChange={handleStateChange}
      outerContainerId='outer-container'
      pageWrapId='page-wrap'>
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
      <Link
        to="/chart"
        className="menu-item mb-3"
        onClick={closeMenu}
      >
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

const mapStateToProps = (state) => ({
  isOpen: state.burgerMenu.isOpen,
  firstName: state.auth.user ? state.auth.user.firstName : '',
  lastName: state.auth.user ? state.auth.user.lastName : '',
});

const mapDispatchToProps = {
  toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);

