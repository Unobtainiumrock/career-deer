import { findAllJobsForUser, deleteJobById, updateJobById } from '../../utils/API';
import mapData from './data-mapper';

export const LOAD_JOBS_REQUEST = 'LOAD_JOBS_REQUEST';
export const LOAD_JOBS_SUCCESS = 'LOAD_JOBS_SUCCESS';
export const LOAD_JOBS_FAILURE = 'LOAD_JOBS_FAILURE';

// Move Job
export const MOVE_JOB_REQUEST = 'MOVE_JOB_REQUEST';
export const MOVE_JOB_SUCCESS = 'MOVE_JOB_SUCCESS';
export const MOVE_JOB_FAILURE = 'MOVE_JOB_FAILURE';
export const MOVE_JOB_REVERT = 'MOVE_JOB_REVERT';

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
	type: MOVE_JOB_REQUEST
});

export const moveJobSuccess = (updatedBoards) => ({
	type: MOVE_JOB_SUCCESS,
	payload: updatedBoards
});

export const moveJobFailure = (error) => ({
	type: MOVE_JOB_FAILURE,
	payload: error
});

export const moveJobRevert = (previousBoards) => ({
	type: MOVE_JOB_REVERT,
	payload: previousBoards
})

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

// Updated Thunk for Moving Jobs
export const moveJobThunk = (source, destination, draggableId) => async (dispatch, getState) => {
	dispatch(moveJobRequest());

	const { jobBoard: { columns, jobs } } = getState();

	// Logging for debugging
	console.log('Source:', JSON.stringify(source, null, 2));
	console.log('Destination:', JSON.stringify(destination, null, 2));
	console.log('Columns:', columns);
	console.log('Jobs:', jobs);

	// Validate droppableIds
	const sourceColumn = columns[source.droppableId];
	const destinationColumn = columns[destination.droppableId];

	if (!sourceColumn || !destinationColumn) {
		const errorMsg = `Invalid droppableId: ${source.droppableId} or ${destination.droppableId}`;
		console.error(errorMsg);
		dispatch(moveJobFailure(errorMsg));
		return;
	}

	// **Moving within the same column**
	if (source.droppableId === destination.droppableId) {

		// Create a new array of card IDs
		const newCardIds = Array.from(sourceColumn.cardIds);

		// Remove the job ID from its old position
		newCardIds.splice(source.index, 1);

		// Insert the job ID into its new position
		newCardIds.splice(destination.index, 0, draggableId);

		// Create a new column object with the updated card IDs
		const updatedColumn = {
			...sourceColumn,
			cardIds: newCardIds,
		};

		// Create a new state with the updated column
		const updatedColumns = {
			...columns,
			[updatedColumn.id]: updatedColumn,
		};

		// Dispatch success with updated data
		dispatch(moveJobSuccess({ jobs, columns: updatedColumns }));

		// **No need to update the backend or job's progress_stage**
	} else {
		const updatedJob = {
			...jobs[draggableId],
			progress_stage: destination.droppableId.replace('column-', '')
		};

		const updatedJobs = {
			...jobs,
			[draggableId]: updatedJob,
		};

		// Remove from source column
		const sourceCardIds = Array.from(sourceColumn.cardIds);
		sourceCardIds.splice(source.index, 1);

		const updatedSourceColumn = {
			...sourceColumn,
			cardIds: sourceCardIds,
		};

		// Add to destination column
		const destinationCardIds = Array.from(destinationColumn.cardIds);
		destinationCardIds.splice(destination.index, 0, draggableId);

		const updatedDestinationColumn = {
			...destinationColumn,
			cardIds: destinationCardIds,
		};

		const updatedColumns = {
			...columns,
			[updatedSourceColumn.id]: updatedSourceColumn,
			[updatedDestinationColumn.id]: updatedDestinationColumn,
		};
		// Dispatch success with updated data
		dispatch(moveJobSuccess({ jobs: updatedJobs, columns: updatedColumns }));

		try {
			// Update backend
			console.log('updatedJob', updatedJob);
			await updateJobById(draggableId, {
				progress_stage: updatedJob.progress_stage,
				user: updatedJob.user
			});
		} catch (err) {
			console.error('Move job failed with error:', err);
			const errorMsg = err.response?.data?.error || err.message || 'Failed to move job';
			// Revert the optimistic update
			dispatch(moveJobFailure(errorMsg));
			dispatch(moveJobRevert({ jobs, columns }));
		}
	}
};

// Delete Job Thunk
export const deleteJobThunk = (id, progressStage) => async (dispatch, getState) => {
	dispatch(deleteJ / mnt / c / Users / ddIdk / Desktop / github / career - deer / career - deer / backend / servicesobRequest());
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
