require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const logger = require('morgan');
const morganBody = require('morgan-body');
const path = require('path');

const passport = require('../config/');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("Node env:", process.env.NODE_ENV)
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, 'client/build')));
// }

console.log('Node.js exec arguments:', process.execArgv);

app.use(logger('dev'));
morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/career-deer",
  {
    promiseLibrary: bluebird,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected to MongoDB");

  app.use(session({
    secret: process.env.SESSION_SECRET || "career deer",
    store: MongoStore.create({
      clientPromise: Promise.resolve(mongoose.connection.getClient())
    }),
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  //TODO enable once routes are fixed.
  const routes = require('../routes/api/index');
  app.use(routes);


  // Send every other request to the React app
  // Define any API routes before this runs
  app.get("*", (req, res) => {
    console.log("Dirname:", __dirname)
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});

// Handle connection errors
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
