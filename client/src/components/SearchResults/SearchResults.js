import React from 'react';
import { Col, Row } from '../Grid';
import Button from '@mui/material/Button'; // Updated import
import './SearchResults.css';

import PropTypes from 'prop-types';

const SearchResults = (props) => {
  const link = props.results.title;

  return (
    <div className="card card-shadow border-0 mb-3 bg-light">
      <div className="card-header card-header-bg">
        <a
          href={props.results.url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-0"
        >
          <Button className="job-title">
            <span className="font-weight-bold my-2">{link}</span>
          </Button>
        </a>
        {props.alreadySaved ? (
          <Button
            variant="contained"
            type="button"
            onClick={props.save}
            className="float-right"
            disabled
          >
            Tracked
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={props.save}
            className="float-right track-btn"
          >
            Track
          </Button>
        )}
      </div>
      <div className="card-body bg-light-blue p-0">
        <Row className="col-12 my-3 dark-teal">
          <Col size="12 md-6 lg-6 mx-0">
            <i className="fas fa-file-contract"></i> &nbsp; {props.results.company_name}
          </Col>
          <Col size="12 md-6 lg-6 mx-0">
            <i className="fas fa-map-marked-alt"></i> &nbsp; {props.results.location}
          </Col>
        </Row>
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  alreadySaved: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
};

export default SearchResults;
