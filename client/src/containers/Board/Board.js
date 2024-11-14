import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import { Row, Col } from '../../components/Grid';
import ProgressTile from '../../components/ProgressTile/ProgressTile';
import { AttentionSeeker, Fade } from 'react-awesome-reveal';
import Loading from '../../components/Loading/Loading';

// Redux Stuff
import { connect } from 'react-redux';
import {
  loadJobsThunk,
  moveJobThunk,
  deleteJobThunk,
  resetJobBoard
} from './actions';
import { selectUpdateJob } from '../UpdateJob/actions';

class Board extends Component {
  componentDidMount() {
    this.props.loadJobsThunk();
  }

  onDragEnd = (result) => {
    console.log(`Result inside onDragEnd in Board class: ${JSON.stringify(result, null, 2)}`)
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    this.props.moveJobThunk(source, destination, draggableId);
  };

  render() {
    const { jobBoard, auth, selectUpdateJob } = this.props;
    const { loading, error, columns, columnOrder, jobs } = jobBoard;
    const { isAuthenticated } = auth;

    if (!isAuthenticated) {
      return <Navigate to="/unauthorized" replace />;
    }

    if (loading) {
      return <Loading />;
    }

    const isEmpty = Object.values(columns).every((column) => column.cardIds.length === 0);

    if (isEmpty) {
      return (
        <Row className="justify-content-center text-center pt-5 mx-0 px-0">
          <Col size="12 md-10">
            <AttentionSeeker effect="bounce">
              <img
                className="my-5 house-img"
                width="60%"
                src="/imgs/icons/houses.svg"
                alt="houses"
              />
            </AttentionSeeker>
            <h1 className="montserrat font-weight-bold">Job Tracker Board</h1>
            <h2 className="montserrat text-center pb-5">
              It looks like you have nothing tracked yet!
            </h2>
            <h4>
              Start{' '}
              <a className="text-info" href="/search">
                searching
              </a>{' '}
              for a job or{' '}
              <a className="text-info" href="/addjob">
                add one yourself
              </a>
            </h4>
          </Col>
        </Row>
      );
    }

    return (
      <Fade direction="top" duration={500}>
        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row className="justify-content-center text-center pt-5 mx-0 px-0">
              <Col size="12 md-12 lg-6">
                <h1 className="montserrat font-weight-bold">Job Tracker Board</h1>
                <img width="60%" src="/imgs/icons/houses.svg" alt="houses" />
              </Col>
            </Row>
            <Row className="justify-content-center board pt-4 mx-0 px-0">
              {columnOrder.map(columnId => {
                const column = columns[columnId];
                const jobsList = column.cardIds.map(jobId => jobs[jobId]);

                return (
                  <ProgressTile
                    key={column.id}
                    column={column}
                    jobsList={jobsList}
                    selectUpdateJob={selectUpdateJob}
                    deleteJob={this.props.deleteJobThunk}
                  />
                );
              })}
            </Row>
          </DragDropContext>
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => ({
  jobBoard: state.jobBoard,
  auth: state.auth
});

const mapDispatchToProps = {
  loadJobsThunk,
  moveJobThunk,
  deleteJobThunk,
  resetJobBoard,
  selectUpdateJob
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
