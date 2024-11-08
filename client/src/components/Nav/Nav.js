// import React from "react";
// import "./Nav.css";
// import { Link } from "react-router-dom";
// import Scrollchor from 'react-scrollchor';

// const renderHomeNav = () => (
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav ml-auto w-100 justify-content-end">
//       <li className="nav-item">
//         <Scrollchor
//           to="top"
//           className="nav-link active">
//           Home
//         </Scrollchor>
//       </li>
//       <li className="nav-item">
//         <Scrollchor
//          to="about"
//           className="nav-link">
//           About
//         </Scrollchor>
//       </li>
//       <li className="nav-item">
//         <Scrollchor to="foreal"
//           className="nav-link">
//          Learn More
//         </Scrollchor>
//       </li>
//       <li className="nav-item">
//         <Link to="/signup"
//           className="nav-link">
//           Join Now
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link
//           to="/login"
//           className="nav-link">
//           Login
//         </Link>
//       </li>
//     </ul>
//   </div>
// )

// const renderDefaultNav = () => (
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav ml-auto w-100 justify-content-end">
//       <li className="nav-item">
//         <Link 
//           to="/"
//           className={
//             window.location.pathname === "/" ? "nav-link active" : "nav-link"
//           }>
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/signup"
//           className={
//             window.location.pathname === "/signup" ? "nav-link active" : "nav-link"
//           }>
//           Sign Up
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/login"
//           className={
//             window.location.pathname === "/login" ? "nav-link active" : "nav-link"
//           }>
//           Login
//         </Link>
//       </li>
//     </ul>
//   </div>
// )

// const Nav = ({className="", children, ...props}) => (

// <nav className={`navbar sticky-top navbar-expand-lg navbar-light ${className}`} {...props}>
//   <a className="navbar-brand" href="/"><img className="logo" src="/imgs/logo-horizontal.svg" alt="Career Deer"/></a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//  {window.location.pathname === "/"
//   ? renderHomeNav()
//   : renderDefaultNav() }
// </nav>

// );


// export {Nav};

// import React from 'react';
// import './Nav.css';
// import { Link, useLocation } from 'react-router-dom';
// import Scrollchor from 'react-scrollchor';

// const Nav = ({ className = '', children, ...props }) => {
//   const location = useLocation();

//   const renderHomeNav = () => (
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav ml-auto w-100 justify-content-end">
//         <li className="nav-item">
//           <Scrollchor to="top" className="nav-link active">
//             Home
//           </Scrollchor>
//         </li>
//         <li className="nav-item">
//           <Scrollchor to="about" className="nav-link">
//             About
//           </Scrollchor>
//         </li>
//         <li className="nav-item">
//           <Scrollchor to="foreal" className="nav-link">
//             Learn More
//           </Scrollchor>
//         </li>
//         <li className="nav-item">
//           <Link to="/signup" className="nav-link">
//             Join Now
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );

//   const renderDefaultNav = () => (
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav ml-auto w-100 justify-content-end">
//         <li className="nav-item">
//           <Link
//             to="/"
//             className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
//           >
//             Home
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link
//             to="/signup"
//             className={location.pathname === '/signup' ? 'nav-link active' : 'nav-link'}
//           >
//             Sign Up
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link
//             to="/login"
//             className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}
//           >
//             Login
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );

//   return (
//     <nav
//       className={`navbar sticky-top navbar-expand-lg navbar-light ${className}`}
//       {...props}
//     >
//       <Link className="navbar-brand" to="/">
//         <img className="logo" src="/imgs/logo-horizontal.svg" alt="Career Deer" />
//       </Link>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {location.pathname === '/' ? renderHomeNav() : renderDefaultNav()}
//     </nav>
//   );
// };

// export { Nav };

// import React from "react";
// import "./Nav.css";
// import { Link, withRouter } from "react-router-dom";
// import Scrollchor from 'react-scrollchor';

// const renderHomeNav = () => (
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav ml-auto w-100 justify-content-end">
//       <li className="nav-item">
//         <Scrollchor
//           to="top"
//           className="nav-link active">
//           Home
//         </Scrollchor>
//       </li>
//       <li className="nav-item">
//         <Scrollchor
//          to="about"
//           className="nav-link">
//           About
//         </Scrollchor>
//       </li>
//       <li className="nav-item">
//         <Scrollchor to="foreal"
//           className="nav-link">
//          Learn More
//         </Scrollchor>
//       </li>
//       <li className="nav-item">
//         <Link to="/signup"
//           className="nav-link">
//           Join Now
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link
//           to="/login"
//           className="nav-link">
//           Login
//         </Link>
//       </li>
//     </ul>
//   </div>
// )

// const renderDefaultNav = () => (
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav ml-auto w-100 justify-content-end">
//       <li className="nav-item">
//         <Link 
//           to="/"
//           className={
//             window.location.pathname === "/" ? "nav-link active" : "nav-link"
//           }>
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/signup"
//           className={
//             window.location.pathname === "/signup" ? "nav-link active" : "nav-link"
//           }>
//           Sign Up
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/login"
//           className={
//             window.location.pathname === "/login" ? "nav-link active" : "nav-link"
//           }>
//           Login
//         </Link>
//       </li>
//     </ul>
//   </div>
// )

// const Nav = ({className="", children, ...props}) => (

// <nav className={`navbar sticky-top navbar-expand-lg navbar-light ${className}`} {...props}>
//   <a className="navbar-brand" href="/"><img className="logo" src="/imgs/logo-horizontal.svg" alt="Career Deer"/></a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//  {window.location.pathname === "/"
//   ? renderHomeNav()
//   : renderDefaultNav() }
// </nav>

// );


// export {Nav};


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
