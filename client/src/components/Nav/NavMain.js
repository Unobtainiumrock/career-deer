// import React from "react";
// import { Link } from "react-router-dom";
// import "./Nav.css";

// const NavMain = ({className="", children, ...props}) => (

// <nav className={`navbar sticky-top navbar-expand-lg navbar-light ${className}`} {...props}>
//   <Link className="navbar-brand" to="/"><img className="logo" src="/imgs/logo-horizontal.svg" alt="Career Deer"/></Link>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

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
//         <Link to="/addjob"
//           className={
//             window.location.pathname === "/addjob" ? "nav-link active" : "nav-link"
//           }>
//           Add Custom Job
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/search"
//           className={
//             window.location.pathname === "/search" ? "nav-link active" : "nav-link"
//           }>
//          Search for a Job
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/chart"
//           className={
//             window.location.pathname === "/chart" ? "nav-link active" : "nav-link"
//           }>
//           View Chart Data
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/nomatch"
//           className={
//             window.location.pathname === "/nomatch" ? "nav-link active" : "nav-link"
//           }>
//           404 Page
//         </Link>
//       </li>
//       <li className="nav-item dropdown">
//         <Link className="nav-link dropdown-toggle" to="/signup" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Sign Up / Login
//         </Link>
//         <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
//           <Link className="dropdown-item" to="/signup">Sign Up</Link>
//           <Link className="dropdown-item" to="/login">Login</Link>
//         </div>
//       </li>
//     </ul>
//   </div>
// </nav>

// );


// export {NavMain};
