// Consider whether or not this rendering flow that's split between home and default navs makes any sense..

import React from 'react';
import './Nav.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Nav = ({ className = '', children, ...props }) => {
  const location = useLocation();

  const renderHomeNav = () => (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto w-100 justify-content-end">
        <li className="nav-item">
          <ScrollLink to="top" smooth={true} className="nav-link active">
            Home
          </ScrollLink>
        </li>
        <li className="nav-item">
          <ScrollLink to="about" smooth={true} className="nav-link">
            About
          </ScrollLink>
        </li>
        <li className="nav-item">
          <ScrollLink to="foreal" smooth={true} className="nav-link">
            Learn More
          </ScrollLink>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Join Now
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

  const renderDefaultNav = () => (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto w-100 justify-content-end">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <nav
      className={`navbar sticky-top navbar-expand-lg navbar-light ${className}`}
      {...props}
    >
      <Link className="navbar-brand" to="/">
        <img
          className="logo"
          src="/imgs/logo-horizontal.svg"
          alt="Career Deer"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {location.pathname === '/' ? renderHomeNav() : renderDefaultNav()}
    </nav>
  );
};

export { Nav };
