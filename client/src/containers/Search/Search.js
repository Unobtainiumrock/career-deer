import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import SearchForm from '../../components/SearchForm';
import SearchResults from '../../components/SearchResults';
import { Container, Col, Row } from '../../components/Grid';

import { connect } from 'react-redux';

import { getSearchJobs, postSaveJob, getAllSavedJobs } from './actions';
import LinearProgress from '@mui/material/LinearProgress';

class Search extends Component {
  componentDidMount() {
    this.props.getAllSavedJobs();
  }

  searchJobs = (values) => {
    // Calling the search job action.
    this.props.getSearchJobs(values);
  };

  saveJob = (index) => {
    const { searchData } = this.props;
    const savedData = searchData.saved;
    const jobToSave = searchData.data[index];
    const saveJobUrl = jobToSave.url;

    // Check if the job is already saved
    const isUnique = !savedData.some((savedJob) => savedJob.url === saveJobUrl);

    if (isUnique) {
      this.props.postSaveJob(jobToSave);
      // No need to call getAllSavedJobs again, as the saved jobs should update via Redux
      // this.props.getAllSavedJobs();
    }
  };

  alreadySaved = (index) => {
    const { searchData } = this.props;
    const savedData = searchData.saved;
    const jobUrl = searchData.data[index].url;

    return savedData.some((savedJob) => savedJob.url === jobUrl);
  };

  render() {
    const { isAuthenticated, searchData } = this.props;

    if (!isAuthenticated) {
      return <Navigate to="/unauthorized" replace />;
    }

    const huntStyle = {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10px',
    };

    return (
      <Container className="pt-5">
        <Row className="justify-content-center">
          <Col size="12 md-12 lg-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <img
                style={huntStyle}
                src="/imgs/icons/hunt.svg"
                alt="hunt the deer"
              />
            </motion.div>
          </Col>
          <Col size="12 md-12 lg-7">
            <SearchForm
              onSubmitForm={this.searchJobs}
              errorMessage={searchData.error}
            />
          </Col>
        </Row>
        <br />
        {searchData.loading && <LinearProgress />}
        <Row className="justify-content-center mt-5">
          <Col size="12 card">
            {searchData.data.map((result, index) => (
              <SearchResults
                key={index}
                results={result}
                save={() => this.saveJob(index)}
                alreadySaved={this.alreadySaved(index)}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  searchData: state.searchData,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  getSearchJobs,
  postSaveJob,
  getAllSavedJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
