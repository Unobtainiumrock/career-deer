const db = require('../models');

module.exports = {
  aggregateJobDataForCharts: async (req, res) => {
    try {
      res.json(await db.Job.aggregate([{
        "$group": {
          _id: "$progress_stage",
          count: {
            $sum: 1
          }
        }
      }]));
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findUser: async (req, res) => {
    try {
      res.json(await db.Job.aggregate([
        { "$match": { user: req.user._id } },
        {
          "$group": {
            _id: "$progress_stage",
            count: { $sum: 1 }
          }
        }
      ]));
    } catch (err) {
      res.status(422).json(err);
    }
  },
  userPercentile: async (req, res) => {
    try {
      const percentiles = await getPercentiles(req);
      res.json(percentiles);
    } catch (err) {
      res.status(422).json(err);
    }
  }
}

async function getPercentiles(req) {
  const userId = req.user._id;
  const { saved, applied, phone, onSite, offer } = req.query;

  // Ensure stage counts are numbers
  const stages = [
    { name: "saved", count: saved },
    { name: "applied", count: applied },
    { name: "phone", count: phone },
    { name: "on-site", count: onSite },
    { name: "offer", count: offer }
  ];

  // Validate stage counts
  for (const stage of stages) {
    if (!stage.count || isNaN(stage.count)) {
      throw new Error(`Invalid or missing count for stage: ${stage.name}`);
    }
  }

  const promises = [];

  for (const stage of stages) {
    const aboveUser = getGtData(stage.name, stage.count, userId);
    const belowUser = getLtData(stage.name, stage.count, userId);
    promises.push(aboveUser, belowUser);
  }

  return Promise.all(promises);
}

//Takes in a progress stage and a count for comparison against each user. Returns the number of unique users less than or equal to count.
async function getLtData(stage, stageCount, userId) {
  const obj = {};

  const count = parseInt(stageCount);

  if (isNaN(count)) {
    throw new Error(`Invalid stageCount for stage: ${stage}`);
  }

  try {
    const data = await db.Job.aggregate([
      {
        "$group": {
          "_id": {
            "progress_stage": "$progress_stage",
            "user": "$user"
          },
          "count": { "$sum": 1 }
        }
      },
      {
        "$match": {
          "_id.progress_stage": stage,
          "_id.user": { "$ne": userId }, // Exclude current user
          "count": { "$lte": count }
        }
      },
      {
        "$group": {
          "_id": "$_id.progress_stage",
          "uniqueUsers": { "$sum": 1 }
        }
      }
    ]);

    obj.belowUser = data[0] || {
      "_id": stage,
      "uniqueUsers": 0
    };

    return obj;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//Takes in a progress stage and a count for comparison against each user. Returns the number of unique users greater than count.
async function getGtData(stage, stageCount, userId) {
  const obj = {};

  const count = parseInt(stageCount);

  if (isNaN(count)) {
    throw new Error(`Invalid stageCount for stage: ${stage}`);
  }

  try {
    const data = await db.Job.aggregate([
      {
        "$group": {
          "_id": {
            "progress_stage": "$progress_stage",
            "user": "$user"
          },
          "count": { "$sum": 1 }
        }
      },
      {
        "$match": {
          "_id.progress_stage": stage,
          "_id.user": { "$ne": userId }, // Exclude current user
          "count": { "$gt": count }
        }
      },
      {
        "$group": {
          "_id": "$_id.progress_stage",
          "uniqueUsers": { "$sum": 1 }
        }
      }
    ]);

    obj.aboveUser = data[0] || {
      "_id": stage,
      "uniqueUsers": 0
    };

    return obj;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
