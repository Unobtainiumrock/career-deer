const router = require('express').Router();
const jobRoutes = require('./jobs');
const authRoutes = require('./authRoutes')

router.use('/api/jobs', jobRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;
