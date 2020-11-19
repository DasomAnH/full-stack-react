var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const models = require('./models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: models.sequelize });
const apiPostsRouter = require('./routes/api-posts');
const apiCommentsRouter = require('./routes/api-comments');
const apiRegisterRouter = require('./routes/api-register');
const apiLoginRouter = require('./routes/api-login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(
  session({
    secret: 'Pan', // used to sign the cookie
    resave: false, // update session even w/ no changes
    saveUninitialized: false, // always create a session
    store: store,
  })
);

app.use('/api/v1/posts', apiPostsRouter);
app.use('/api/v1/comments', apiCommentsRouter);
app.use('/api/v1/register', apiRegisterRouter);
app.use('/api/v1/login', apiLoginRouter);

module.exports = app;
