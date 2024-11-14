import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Container, Col, Row } from '../../components/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Zoom, AttentionSeeker } from 'react-awesome-reveal';

import { connect } from 'react-redux';
import {
  resetViewJobs,
  getAllSavedJobs,
  updateViewJobs,
} from './actions';
import { selectUpdateJob } from '../UpdateJob/actions';
import PropTypes from 'prop-types';

const cardStyles = {
  width: '250px',
  minHeight: '250px',
};

const cardHeadingStyle = {
  color: '#5869A7',
};

class ViewJobs extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getAllSavedJobs();
    }
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Navigate to="/unauthorized" replace />;
    }

    return (
      <React.Fragment>
        <Container className="py-5 pb-4">
          <Row className="justify-content-center text-center">
            <Col size="12 md-12 lg-10">
              <AttentionSeeker effect="bounce">
                <img width="60%" src="/imgs/icons/houses.svg" alt="houses" />
              </AttentionSeeker>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col size="12 md-12 lg-5">
              <h1 className="text-center montserrat font-weight-bold">
                Your Tracked Jobs
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {this.props.viewJobs.data.map((job, i) => (
              <Zoom key={`viewjob-${i}`}>
                <Card className="my-2 mx-2" style={cardStyles}>
                  <CardContent>
                    <Typography className="pt-2" color="textSecondary">
                      {job.company_name}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h2"
                      style={cardHeadingStyle}
                    >
                      {job.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {job.post_date}
                    </Typography>
                    <Typography component="p">{job.location}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link to="/updatejob">
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.props.selectUpdateJob(this.props.viewJobs.data[i])
                        }
                        data-id={job._id}
                      >
                        <i className="fas fa-pen-square"></i> &nbsp; Edit
                      </Button>
                    </Link>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      View on Tracker
                    </Button>
                  </CardActions>
                </Card>
              </Zoom>
            ))}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

ViewJobs.propTypes = {
  viewJobs: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
  updateJob: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getAllSavedJobs: PropTypes.func.isRequired,
  selectUpdateJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewJobs: state.viewJobs,
  updateJob: state.updateJob,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  resetViewJobs,
  updateViewJobs,
  getAllSavedJobs,
  selectUpdateJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewJobs);
