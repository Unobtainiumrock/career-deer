// import React, { useEffect } from 'react';
// import { Redirect } from "react-router-dom";
// import UpdateJobForm from '../../components/UpdateJobForm/UpdateJobForm';
// import { Container, Col, Row } from '../../components/Grid';
// import { connect } from 'react-redux';
// import { executeDeleteJob, executeUpdateJob, resetUpdateJob, /*selectUpdateJob*/ } from './actions';
// // import { grabJobs } from '../Board/actions';

// const UpdateJob = ({ updateJob, app, executeUpdateJob, executeDeleteJob, resetUpdateJob, /*initialValues*/ }) => {
//   useEffect(() => {
//     if (!updateJob.job) {
//       resetUpdateJob();
//     }
//   }, [updateJob.job, resetUpdateJob]);

//   if (!app.user) {
//     return <Redirect to='/unauthorized' />;
//   }

//   if (updateJob.status || !updateJob.job) {
//     return <Redirect to='/board' />;
//   }

//   const updateJobValues = values => {
//     executeUpdateJob({ ...values, _id: updateJob.job._id });
//   };

//   return (
//     <Container>
//       <Row>
//         <Col className="text-center">
//           <h1 className="montserrat font-weight-bold mt-5"><i className="fas fa-edit"></i> Update this job</h1>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col />
//         <Col size="12 md-12 lg-10">
//           <UpdateJobForm
//             onSubmit={updateJobValues}
//             deleteJob={() => executeDeleteJob(updateJob.job._id)}
//             initialValues={updateJob.job}
//           />
//         </Col>
//         <Col />
//       </Row>
//     </Container>
//   );
// };

// const mapStateToProps = (state) => ({
//   updateJob: state.updateJob,
//   app: state.app
// });

// const mapDispatchToProps = {
//   executeDeleteJob,
//   executeUpdateJob,
//   resetUpdateJob
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UpdateJob);

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UpdateJobForm from '../../components/UpdateJobForm/UpdateJobForm';
import { Container, Col, Row } from '../../components/Grid';
import { connect } from 'react-redux';
import {
  updateJobThunk,
  deleteJobThunk,
  resetUpdateJob,
} from './actions';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const UpdateJob = ({
  updateJob,
  user,
  updateJobThunk,
  deleteJobThunk,
  resetUpdateJob,
}) => {
  useEffect(() => {
    if (!updateJob.job) {
      resetUpdateJob();
    }
  }, [updateJob.job, resetUpdateJob]);

  // if (!user) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  if (updateJob.loading) {
    return <Loading />;
  }

  if (updateJob.error) {
    return <ErrorMessage message={updateJob.error} />;
  }

  // if (updateJob.status || !updateJob.job) {
  //   return <Navigate to="/board" replace />;
  // }

  const updateJobValues = (values) => {
    updateJobThunk({ ...values, _id: updateJob.job._id });
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1 className="montserrat font-weight-bold mt-5">
            <i className="fas fa-edit"></i> Update this job
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col />
        <Col size="12 md-12 lg-10">
          <UpdateJobForm
            onSubmit={updateJobValues}
            deleteJob={() => deleteJobThunk(updateJob.job._id)}
            initialValues={updateJob.job}
          />
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

UpdateJob.propTypes = {
  updateJob: PropTypes.shape({
    job: PropTypes.object,
    status: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  user: PropTypes.object,
  updateJobThunk: PropTypes.func.isRequired,
  deleteJobThunk: PropTypes.func.isRequired,
  resetUpdateJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  updateJob: state.updateJob,
  user: state.auth.user,
});

const mapDispatchToProps = {
  updateJobThunk,
  deleteJobThunk,
  resetUpdateJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateJob);
