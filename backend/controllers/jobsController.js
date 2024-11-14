const db = require('../models');

module.exports = {
  findAllJobsForUser: async (req, res) => {
    try {
      let query = { user: req.user._id };
      res.json(await db.Job.find(query).sort({ last_update: -1 }));
    } catch (err) {
      res.status(422).json(err);
    }
  },
  createJob: async (req, res) => {
    console.log('req.body in createJob', req.body);
    try {
      const newJob = {
        ...req.body,
        note: [req.body.note],
        user: req.user._id,
      };
      res.json(await db.Job.create(newJob));
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findOne: async (req, res) => {
    try {
      let query = { _id: req.params.id, user: req.user._id };
      res.json(await db.Job.findOne(query).populate("note"));
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const jobId = req.params.id;
      const userId = req.user.id;
      const query = { _id: jobId, user: userId };

      const updatedJob = {
        progress_stage: req.body.progress_stage,
        last_update: new Date()
      }
      res.json(await db.Job.findOneAndUpdate(query, { $set: updatedJob }, { new: true }));
    } catch (err) {
      res.status(422).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      let query = { _id: req.params.id, user: req.user._id };
      let removed = await db.Job.deleteOne(query);
      res.json(removed);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
