// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import { Redirect } from "react-router-dom";

// import queryString from 'query-string';

// import { updatePassword } from './actions';
// import UpdatePWForm from '../../components/UpdatePWForm';

// import { Col, Row, Container } from '../../components/Grid';
// import Flip from 'react-reveal/Flip';

// class UpdatePW extends Component {

//     componentDidMount() {

//     }

//     requestUpdatePW = values => {
//         const queryInfo = queryString.parse(this.props.location.search);
//         values["code"] = queryInfo.code;
//         this.props.updatePassword(values);
//     }

//     render() {
//         if (this.props.pwUpdate.status) {
//             return <Redirect to='/login' />
//         } else {
//             return (
//                 <Container>
//                     <Row className="justify-content-center text-center pt-5 mx-0 px-0">
//                         <Col size="12 md-10">
//                             <Flip right>
//                                 <img className="my-4" width="45%" src="/imgs/icons/password.svg" alt="forgot your password?" />
//                             </Flip>
//                         </Col>
//                     </Row>
//                     <UpdatePWForm onSubmit={this.requestUpdatePW} />
//                 </Container>
//             )
//         }
//     }
// }


// const mapStateToProps = (state, props) => {
//     return {
//         pwUpdate: state.pwUpdate,
//         app: state.app
//     }
// }

// const mapDispatchToProps = (dispatch, props) => ({
//     updatePassword
// })

// export default connect(mapStateToProps, mapDispatchToProps())(UpdatePW);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import { Redirect } from 'react-router-dom';

// import queryString from 'query-string';

// import { updatePassword } from './actions';
// import UpdatePWForm from '../../components/UpdatePWForm';

// import { Col, Row, Container } from '../../components/Grid';
// import { Flip } from 'react-awesome-reveal'; // Updated import

// class UpdatePW extends Component {
//   componentDidMount() {}

//   requestUpdatePW = (values) => {
//     const queryInfo = queryString.parse(this.props.location.search);
//     values['code'] = queryInfo.code;
//     this.props.updatePassword(values);
//   };

//   render() {
//     if (this.props.pwUpdate.status) {
//       return <Redirect to="/login" />;
//     } else {
//       return (
//         <Container>
//           <Row className="justify-content-center text-center pt-5 mx-0 px-0">
//             <Col size="12 md-10">
//               <Flip direction="horizontal">
//                 <img
//                   className="my-4"
//                   width="45%"
//                   src="/imgs/icons/password.svg"
//                   alt="forgot your password?"
//                 />
//               </Flip>
//             </Col>
//           </Row>
//           <UpdatePWForm onSubmit={this.requestUpdatePW} />
//         </Container>
//       );
//     }
//   }
// }

// const mapStateToProps = (state, props) => {
//   return {
//     pwUpdate: state.pwUpdate,
//     app: state.app,
//   };
// };

// const mapDispatchToProps = {
//   updatePassword,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UpdatePW);

// UpdatePW.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { updatePassword } from './actions';
import UpdatePWForm from '../../components/UpdatePWForm';

import { Col, Row, Container } from '../../components/Grid';
import { Flip } from 'react-awesome-reveal'; // Updated import

class UpdatePW extends Component {
  requestUpdatePW = (values) => {
    // Use URLSearchParams to parse query parameters
    const searchParams = new URLSearchParams(this.props.location.search);
    const code = searchParams.get('code');
    values['code'] = code;
    this.props.updatePassword(values);
  };

  render() {
    if (this.props.pwUpdate.status) {
      return <Navigate to="/login" replace />;
    } else {
      return (
        <Container>
          <Row className="justify-content-center text-center pt-5 mx-0 px-0">
            <Col size="12 md-10">
              <Flip direction="horizontal">
                <img
                  className="my-4"
                  width="45%"
                  src="/imgs/icons/password.svg"
                  alt="forgot your password?"
                />
              </Flip>
            </Col>
          </Row>
          <UpdatePWForm onSubmit={this.requestUpdatePW} />
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  pwUpdate: state.pwUpdate,
  app: state.app,
});

const mapDispatchToProps = {
  updatePassword,
};

// Custom withRouter HOC to pass router props to class component
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdatePW));
