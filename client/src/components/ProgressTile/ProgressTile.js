import React, { Component } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import JobTile from './JobTile';
import { Box, Typography } from '@mui/material';
import './ProgressTile.css';

// Function to dynamically set styles based on drag state
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#1670bd' : '#e3edf6',
  width: '270px',
  minHeight: '300px',
  maxHeight: '70vh',
  boxShadow: '0px 0px 1px #fff',
  padding: '10px',
  borderRadius: '10px',
  overflow: 'auto',
});

class ProgressTile extends Component {
  render() {
    const { column, jobsList, selectUpdateJob, deleteJob } = this.props;

    return (
      <Box className="mb-5 mx-1 inline">
        <Typography variant="h5" align="center" className="text-uppercase montserrat">
          {column.title}
        </Typography>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={getListStyle(snapshot.isDraggingOver)}
            >
              {jobsList.map((job, index) => (
                <JobTile
                  key={job.id}
                  job={job}
                  idx={index}
                  selectUpdateJob={selectUpdateJob}
                  deleteJobThunk={() => deleteJob(job.id, column.id)}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    );
  }
}

export default ProgressTile;
