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
      let query = { _id: req.body._id, user: req.body.user, post_date: req.body.post_date };
      console.log('Query:', query);
      const newJob = {
        ...req.body,
        post_date: new Date(req.body.post_date),
        last_update: new Date()
      };
      res.json(await db.Job.findOneAndUpdate(query, { $set: newJob }, { new: true }));
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
