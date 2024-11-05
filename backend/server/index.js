require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const logger = require('morgan');
const morganBody = require('morgan-body');
const path = require('path');
const passport = require('../config/');

const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

// CORS Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://careerdeer.io'
];

app.use(cors({
  origin: function(origin, callback){
    console.log(`Incoming origin: ${origin}`);
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging Middleware
console.log("Node env:", process.env.NODE_ENV);
console.log('Node.js exec arguments:', process.execArgv);
app.use(logger('dev'));
morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false
});

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "career deer",
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/career-deer",
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Logging Session and User
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  console.log('Authenticated User:', req.user);
  next();
});

// Routes
const routes = require('../routes/api/index');
app.use(routes);

// Serve Static Assets
if (isProduction) {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(404).send('Not Found');
  });
}

// Connect to MongoDB and Start Server
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/career-deer",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
