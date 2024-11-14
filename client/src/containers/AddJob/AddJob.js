import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'; // Updated import
import AddJobForm from '../../components/AddJobForm/AddJobForm';
import { Container, Col, Row } from '../../components/Grid';

import { connect } from 'react-redux';
import { addJobThunk, resetAddJob } from './actions';

import { AttentionSeeker } from 'react-awesome-reveal'; // Updated import

class AddJob extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.addJob.status !== this.props.addJob.status && this.props.addJob.status) {
      // Optionally reset the form or state here
      this.props.resetAddJob();
    }
  }

  render() {
    const { addJob, addJobThunk } = this.props;

    return (
      <Container className="pt-5">
        <Row className="justify-content-center text-center">
          <Col size="12 lg-10">
            <AttentionSeeker effect="rubberBand">
              <img
                width="80%"
                src="/imgs/icons/walking.svg"
                alt="hunt the deer"
              />
            </AttentionSeeker>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3 className="montserrat font-weight-bold mt-3">
              Track a New Job
            </h3>
            <h6>
              Found a job from somewhere else? Import it here and you'll be able
              to track your progress!
            </h6>
          </Col>
        </Row>
        <AddJobForm onSubmitForm={addJobThunk} errorMessage={addJob.error} isLoading={addJob.loading} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  addJob: state.addJob,
});

const mapDispatchToProps = {
  addJobThunk,
  resetAddJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
