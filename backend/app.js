const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require("dotenv").config();

const cors = require('cors');
const bodyParser = require('body-parser');
const formData = require('express-form-data');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const journalsRouter = require('./routes/journals');
const imagesRouter = require('./routes/images');

const  recipesRouter = require('./routes/recipes');

let serverRouter = require('./routes/server');

// mongoose
const mongoose= require('mongoose');

const app = express();

// mongoose connection
// mongoose.connect('mongodb://localhost/ReactReduxExpressMongo')
// .then(() =>  console.log('connection successful'))
// .catch((err) => console.error(err));


const uri = process.env.ATLAS_URL;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(formData.parse());
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', serverRouter);
app.use('/journals', journalsRouter);
app.use('/images', imagesRouter);
app.use('/recipes', recipesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
