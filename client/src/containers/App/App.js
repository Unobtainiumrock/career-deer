import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Cookies } from 'react-cookie';

import { Nav } from '../../components/Nav';
import Home from '../Home/Home';
import LoginPage from '../Login/LoginPage';
import NoMatch from '../NoMatch/NoMatch';
import SignUp from '../SignUp/SignUp';
import AddJob from '../AddJob/AddJob';
import UpdateJob from '../UpdateJob/UpdateJob';
import ViewJobs from '../ViewJobs/ViewJobs';
import Chart from '../Chart/Chart';
import Search from '../Search/Search';
import Board from '../Board/Board';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import Loading from '../../components/Loading/Loading';

import ResetPW from '../ResetPW/ResetPW';
import UpdatePW from '../UpdatePW/UpdatePW';

// Redux stuff
import { connect } from 'react-redux';
import { appLoginUpdate, appLogoutUpdate, appInitialLoad } from './actions';

class App extends Component {
  // cookies = new Cookies()

  loginAction = (user) => {
    this.props.appLoginUpdate(user);
  };

  logoutAction = () => {
    this.props.appLogoutUpdate();
  };

  componentDidMount() {
    this.props.appInitialLoad();
  }

  selectNav() {
    if (this.props.app.Loading) {
      return null;
    }

    if (this.props.app.user) {
      return (
        <BurgerMenu
          firstName={this.props.app.user ? this.props.app.user.firstName : 'Stray'}
          lastName={this.props.app.user ? this.props.app.user.lastName : 'Deer'}
          logoutAction={this.logoutAction}
        />
      );
    } else {
      return <Nav />;
    }
  }

  render() {
    return (
      <Router>
        <div id="outer-container">
          {this.selectNav()}
          <main id="page-wrap">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/addjob" element={<AddJob />} />
              <Route path="/search" element={<Search />} />
              <Route path="/board" element={<Board />} />
              <Route path="/updatejob" element={<UpdateJob />} />
              {/* <Route path="/viewjobs" element={<ViewJobs />} /> */}
              <Route path="/forgotpw" element={<ResetPW />} />
              <Route path="/updatepw" element={<UpdatePW />} />
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
  app: state.app,
});

const mapDispatchToProps = {
  appLoginUpdate,
  appLogoutUpdate,
  appInitialLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
