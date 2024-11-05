const router = require('express').Router();
const jobsController = require('../../controllers/jobsController');
const chartController = require('../../controllers/chartController');
const authJobs = require('../../services/authJobs');
const isAuthenticated = require('../../services/isAuthenticated');

//TODO update with authJobs.
// Matching with "/api/jobs/search/?"
router.route('/search')
    .get(isAuthenticated, authJobs);

// Matching with "/api/jobs/saved"
router.route('/saved')
  .get(isAuthenticated, jobsController.findAllJobsForUser)
  .post(isAuthenticated, jobsController.createJob);

// Matching with "/api/jobs/saved/:id"
// For retrieving/deleting/updating info on 1 job
router.route('/saved/:id')
  .get(isAuthenticated, jobsController.findOne)
  .delete(isAuthenticated, jobsController.delete)
  .put(isAuthenticated, jobsController.update);

// Matching with "/api/jobs/chart/all"
router.route('/chart/all')
  .get(chartController.aggregateJobDataForCharts);

router.route('/chart/user')
  .get(isAuthenticated, chartController.findUser);

router.route('/chart/user/percentile')
  .get(isAuthenticated, chartController.userPercentile);

module.exports = router;

