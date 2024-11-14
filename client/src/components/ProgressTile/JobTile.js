import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { Link } from 'react-router-dom';

const cardStyles = {
  width: '250px',
};

const cardHeadingStyle = {
  color: '#5869A7',
};

const JobTile = ({ job, idx, selectUpdateJob, deleteJobThunk }) => {
  return (
    <Draggable draggableId={job.id} index={idx}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            progress={job.progress_stage}
            className="mb-2 mx-auto"
            style={cardStyles}
          >
            <CardContent>
              <IconButton
                className="float-right delete-icon"
                onClick={deleteJobThunk}
                size="small"
              >
                <i className="fas fa-times"></i>
              </IconButton>
              <Typography className="pt-2" color="textSecondary">
                {job.company_name}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                style={cardHeadingStyle}
              >
                {job.url ? (
                  <a
                    className="job-link"
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {job.title}
                  </a>
                ) : (
                  job.title
                )}
              </Typography>
              <Typography color="primary">{job.location}</Typography>
              <Typography className="my-1" color="textSecondary">
                Notes
                <br />
              </Typography>

              {Array.isArray(job.note) && job.note.length > 0 ? (
                job.note.map((element, i) => (
                  <Typography
                    key={`note-${i}`}
                    className="note my-2"
                    component="p"
                  >
                    {element || 'no notes yet...'}
                  </Typography>
                ))
              ) : (
                <Typography className="note my-2" component="p">
                  No notes yet...
                </Typography>
              )}
            </CardContent>
            <CardActions className="float-right button-margin">
              <Link to="/updatejob">
                <Tooltip title="Edit this job" placement="left">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                  >
                    <i className="fas fa-pen"></i>
                  </Button>
                </Tooltip>
              </Link>
            </CardActions>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default JobTile;
