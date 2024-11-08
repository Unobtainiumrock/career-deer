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

import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePassword } from './actions';
import UpdatePWForm from '../../components/UpdatePWForm';
import { Col, Row, Container } from '../../components/Grid';
import { Flip } from 'react-awesome-reveal';
import PropTypes from 'prop-types';

const UpdatePW = ({ pwUpdate, updatePassword }) => {
  const location = useLocation();

  const requestUpdatePW = (values) => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    values['code'] = code;
    updatePassword(values);
  };

  if (pwUpdate.status) {
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
        <UpdatePWForm onSubmit={requestUpdatePW} />
      </Container>
    );
  }
};

UpdatePW.propTypes = {
  pwUpdate: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  updatePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pwUpdate: state.pwUpdate,
});

const mapDispatchToProps = {
  updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePW);
