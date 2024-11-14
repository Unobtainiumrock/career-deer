/**
 * Maps an array of job objects into a normalized structure with jobs and columns.
 * @param {Array} jobs - Array of job objects from the API.
 * @returns {Object} - Normalized data containing jobs and columns.
 */
const mapData = jobs => {
  // const positions = ['saved', 'applied', 'phone', 'on-site', 'offer'];

  const normalizedData = {
    jobs: {},
    columns: {
      'column-saved': { id: 'column-saved', title: 'Saved', cardIds: [] },
      'column-applied': { id: 'column-applied', title: 'Applied', cardIds: [] },
      'column-phone': { id: 'column-phone', title: 'Phone Interview', cardIds: [] },
      'column-onsite': { id: 'column-onsite', title: 'On-site Interview', cardIds: [] },
      'column-offer': { id: 'column-offer', title: 'Offer', cardIds: [] }
    }
  };

  jobs.forEach(job => {
    const { _id, progress_stage, ...rest } = job;
    normalizedData.jobs[_id] = { id: _id, ...rest }; // Mapping _id from backend to id on frontend.
    const columnKey = `column-${progress_stage}`;
    if (normalizedData.columns[columnKey]) {
      normalizedData.columns[columnKey].cardIds.push(_id);
    } else {
      console.warn(`Unknown progress_stage "${progress_stage}" for job ID "${_id}"`);
    }
  });

  return normalizedData;
}

export default mapData;
