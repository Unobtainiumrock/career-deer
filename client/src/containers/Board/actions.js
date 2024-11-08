import { findAllJobsForUser, deleteJobById, updateJobById } from '../../utils/API';
import mapData from './data-mapper';

export const LOAD_JOBS_REQUEST = 'LOAD_JOBS_REQUEST';
export const LOAD_JOBS_SUCCESS = 'LOAD_JOBS_SUCCESS';
export const LOAD_JOBS_FAILURE = 'LOAD_JOBS_FAILURE';

// Move Job
export const MOVE_JOB_REQUEST = 'MOVE_JOB_REQUEST';
export const MOVE_JOB_SUCCESS = 'MOVE_JOB_SUCCESS';
export const MOVE_JOB_FAILURE = 'MOVE_JOB_FAILURE';

// Delete Job
export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';

// Reset Job Board
export const RESET_JOB_BOARD = 'RESET_JOB_BOARD';

export const loadJobsRequest = () => ({
	type: LOAD_JOBS_REQUEST
});
  
export const loadJobsSuccess = (jobs) => ({
	type: LOAD_JOBS_SUCCESS,
	payload: jobs
});

export const loadJobsFailure = (error) => ({
	type: LOAD_JOBS_FAILURE,
	payload: error
});

// Move Job Actions
export const moveJobRequest = () => ({
	type: MOVE_JOB_REQUEST,
});

export const moveJobSuccess = (updatedBoards) => ({
	type: MOVE_JOB_SUCCESS,
	payload: updatedBoards
});

export const moveJobFailure = (error) => ({
	type: MOVE_JOB_FAILURE,
	payload: error
});

// Delete Job Actions
export const deleteJobRequest = () => ({
	type: DELETE_JOB_REQUEST
});

export const deleteJobSuccess = (progressStage, updatedJobs) => ({
	type: DELETE_JOB_SUCCESS,
	payload: { [progressStage]: updatedJobs }
});

export const deleteJobFailure = (error) => ({
	type: DELETE_JOB_FAILURE,
	payload: error
});

// Reset Job Board Action
export const resetJobBoard = () => ({
	type: RESET_JOB_BOARD
});

export const loadJobsThunk = () => async (dispatch) => {
	dispatch(loadJobsRequest());
	try {
	  const response = await findAllJobsForUser();
	  const mappedData = mapData(response.data);
	  dispatch(loadJobsSuccess(mappedData));
	} catch (err) {
	  console.error('Load jobs failed with error:', err);
	  const errorMsg = err.response?.data?.error || err.message || 'Failed to load jobs';
	  dispatch(loadJobsFailure(errorMsg));
	}
  };
  
  // Move Job Thunk
  export const moveJobThunk = (source, destination, draggableId) => async (dispatch, getState) => {
	dispatch(moveJobRequest());
	try {
	  // Correctly access boards nested within jobBoard
	  const { jobBoard: { boards } } = getState();
  
	  // Enhanced logging for better debugging
	  console.log('Source:', JSON.stringify(source, null, 2));
	  console.log('Destination:', JSON.stringify(destination, null, 2));
	  console.log('Boards:', boards);
  
	  // Validate droppableIds to ensure they exist in boards
	  if (!boards[source.droppableId] || !boards[destination.droppableId]) {
		throw new Error(`Invalid droppableId: ${source.droppableId} or ${destination.droppableId}`);
	  }
  
	  // Clone the source and destination lists to avoid mutating state directly
	  const sourceList = Array.from(boards[source.droppableId]);
	  const destinationList = Array.from(boards[destination.droppableId]);
	  // Remove the job from the source list
	  const [movedJob] = sourceList.splice(source.index, 1);
	  // **Important:** Clone the moved job to avoid direct state mutation
	  const updatedJob = { ...movedJob, progress_stage: destination.droppableId };
	  // Add the cloned and updated job to the destination list
	  destinationList.splice(destination.index, 0, updatedJob);
	  // Update the boards object with the new lists
	  const updatedBoards = {
		...boards,
		[source.droppableId]: sourceList,
		[destination.droppableId]: destinationList,
	  };
	  // Log the updatedBoards structure for verification
	  console.log('Updated Boards:', updatedBoards);
	  // **Optional:** Ensure each board is still an array to prevent future errors
	  Object.entries(updatedBoards).forEach(([key, value]) => {
		if (!Array.isArray(value)) {
		  console.error(`Board "${key}" is not an array:`, value);
		}
	  });  
	  // Update the job's progress_stage in the backend
	  await updateJobById(draggableId, { progress_stage: updatedJob.progress_stage });
	  // Dispatch the success action with updatedBoards
	  dispatch(moveJobSuccess(updatedBoards));
	} catch (err) {
	  console.error('Move job failed with error:', err);
	  const errorMsg = err.response?.data?.error || err.message || 'Failed to move job';
	  dispatch(moveJobFailure(errorMsg));
	}
  };
  
// Delete Job Thunk
export const deleteJobThunk = (id, progressStage) => async (dispatch, getState) => {
	dispatch(deleteJobRequest());
	try {
		await deleteJobById(id);
		const { boards } = getState();
		const updatedJobs = boards[progressStage].filter((job) => job._id !== id);
		dispatch(deleteJobSuccess(progressStage, updatedJobs));
	} catch (err) {
		console.error('Delete job failed with error:', err);
		const errorMsg = err.response?.data?.error || err.message || 'Failed to delete job';
		dispatch(deleteJobFailure(errorMsg));
	}
};

// export function jobBoardLoadSuccess() {
// 	return {
// 		type: JOBBOARD_LOAD_SUCCESS,
// 		payload: {
// 			loading: false
// 		}
// 	}
// }

// export function jobBoardLoadReset() {
// 	return {
// 		type: JOBBOARD_LOAD_RESET,
// 		payload: {
// 			loading: true
// 		}
// 	}
// }

// export function grabJobs() {
// 	return async (dispatch, getState) => {
// 		try {
// 			const apiResponse = await (findAllJobsForUser());
// 			dispatch(grabJobsSuccess(mapData(apiResponse.data)));
// 			dispatch(jobBoardLoadSuccess());
// 		}
// 		catch (err) {
// 			dispatch(grabJobsFail(err));
// 		}
// 	}
// }

// /**
//  * @param  {Array} jobs is an array of job objects
//  * @param  {string} key is a string that references a coresponding tile position
//  *                  name on our intial state object.
//  * @param  {Object} crossMoved (optional) is an object of the following format
//  *                  { source: [{job},{job},..], destination: [{job},{job}..]  }
//  */
// export function moveJob(jobs,key,crossMoved = undefined) {
// 	return {
// 	  type: MOVE_JOB,
// 	  payload:	crossMoved || { [key]: jobs	}
// 	}
// };

// export function executeDeleteJob(id, jobs, progress_stage) {
// 	return async (dispatch) => {
// 		await deleteJobById(id);
// 		dispatch(deleteJob(progress_stage, jobs.filter(elem => elem._id !== id)));
// 	}
// }

// export function deleteJob(progress_stage, jobs) {
// 	return {
// 		type: DELETE_JOB,
// 		payload: {[progress_stage]: jobs}
// 	}
// }
  
// export function grabJobsSuccess(data) {
// 	return {
// 		type: JOBS_SUCCESS,
// 		payload: data
// 	}
// }

// export function grabJobsFail(data) {
// 	return {
// 		type: JOBS_FAIL,
// 		payload: data
// 	}
// }
