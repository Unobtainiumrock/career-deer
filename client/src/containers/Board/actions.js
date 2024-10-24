import { findAllJobsForUser, deleteJobById } from '../../utils/API';
import mapData from './data-mapper';

export const JOBS_SUCCESS = "JOBS_SUCCESS";
export const JOBS_FAIL = "JOBS_FAIL";
export const MOVE_JOB = "MOVE_JOB";
export const DELETE_JOB = "DELETE_JOB";
export const JOBBOARD_LOAD_SUCCESS = "JOBBOARD_LOAD_SUCCESS";
export const JOBBOARD_LOAD_RESET = "JOBBOARD_LOAD_RESET";

export function jobBoardLoadSuccess() {
	return {
		type: JOBBOARD_LOAD_SUCCESS,
		payload: {
			loading: false
		}
	}
}

export function jobBoardLoadReset() {
	return {
		type: JOBBOARD_LOAD_RESET,
		payload: {
			loading: true
		}
	}
}

export function grabJobs() {
	return async (dispatch, getState) => {
		try {
			const apiResponse = await (findAllJobsForUser());
			dispatch(grabJobsSuccess(mapData(apiResponse.data)));
			dispatch(jobBoardLoadSuccess());
		}
		catch (err) {
			dispatch(grabJobsFail(err));
		}
	}
}

/**
 * @param  {Array} jobs is an array of job objects
 * @param  {string} key is a string that references a coresponding tile position
 *                  name on our intial state object.
 * @param  {Object} crossMoved (optional) is an object of the following format
 *                  { source: [{job},{job},..], destination: [{job},{job}..]  }
 */
export function moveJob(jobs,key,crossMoved = undefined) {
	return {
	  type: MOVE_JOB,
	  payload:	crossMoved || { [key]: jobs	}
	}
};

export function executeDeleteJob(id, jobs, progress_stage) {
	return async (dispatch) => {
		await deleteJobById(id);
		dispatch(deleteJob(progress_stage, jobs.filter(elem => elem._id !== id)));
	}
}

export function deleteJob(progress_stage, jobs) {
	return {
		type: DELETE_JOB,
		payload: {[progress_stage]: jobs}
	}
}
  
export function grabJobsSuccess(data) {
	return {
		type: JOBS_SUCCESS,
		payload: data
	}
}

export function grabJobsFail(data) {
	return {
		type: JOBS_FAIL,
		payload: data
	}
}
