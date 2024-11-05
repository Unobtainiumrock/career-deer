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

import ResetPW from '../ResetPW/ResetPW';
import UpdatePW from '../UpdatePW/UpdatePW';

// Redux stuff
import { connect } from 'react-redux';
import { appLogoutUpdate, appInitialLoad } from './actions';

class App extends Component {

  componentDidMount() {
    this.props.appInitialLoad()
  }

  handleLogout = () => {
    this.props.appLogoutUpdate();
  }

  renderNav() {
    const { app } = this.props;

    if (app.loading) {
      return <Loading />;
    }

    if (app.user) {
      return (
        <BurgerMenu
          firstName={app.user.firstName || 'Stray'}
          lastName={app.user.lastName || 'Deer'}
          logoutAction={this.handleLogout}
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
          {this.renderNav()}
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
  appLogoutUpdate,
  appInitialLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
