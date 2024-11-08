import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Nav } from '../../components/Nav';
import Home from '../Home/Home';
import LoginPage from '../Login/LoginPage';
import NoMatch from '../NoMatch/NoMatch';
import SignUp from '../SignUp/SignUp';
import AddJob from '../AddJob/AddJob';
import UpdateJob from '../UpdateJob/UpdateJob';
import Chart from '../Chart/Chart';
import Search from '../Search/Search';
import Board from '../Board/Board';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import Loading from '../../components/Loading/Loading';
import ProtectedRoute from '../ProtectedRoute';

import ResetPW from '../ResetPW/ResetPW';
import UpdatePW from '../UpdatePW/UpdatePW';

// Redux stuff
import { connect } from 'react-redux';
import { loadUser, logoutThunk } from '../sharedActions/authActions';

class App extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  handleLogout = () => {
    this.props.logoutThunk();
  }

  renderNav() {
    const { user } = this.props;

    if (user) {
      return (
        <BurgerMenu
          firstName={user.firstName || 'Stray'}
          lastName={user.lastName || 'Deer'}
          logoutAction={this.handleLogout}
        />
      );
    } else {
      return <Nav />;
    }
  }

  render() {
    const { loading } = this.props;
    console.log("Props", this.props);
    
    if (loading) {
      return <Loading />;
    }

    return (
      <Router>
        <div id="outer-container">
          {this.renderNav()}
          <main id="page-wrap">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/chart" element={<ProtectedRoute><Chart /></ProtectedRoute>} />
              <Route path="/addjob" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
              <Route path="/board" element={<ProtectedRoute><Board /></ProtectedRoute>} />
              <Route path="/updatejob" element={<ProtectedRoute><UpdateJob /></ProtectedRoute>} />
              <Route path="/forgotpw" element={<ResetPW />} />
              <Route path="/updatepw" element={<ProtectedRoute><UpdatePW /></ProtectedRoute>} />
              <Route path="/loading" element={<Loading />} />
              {/* NoMatch Route for 404 */}
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

// The nav bar needs to know whether we're logged in
const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading
});

const mapDispatchToProps = {
  loadUser,
  logoutThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
