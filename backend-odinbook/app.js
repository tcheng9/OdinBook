//Packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const session = require("express-session");
const User = require('./models/user');


//CORS
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//Routes import
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var showPageRouter = require('./routes/showPage');
var signupRouter = require('./routes/signup');
var timelineRouter = require('./routes/timeline');
var postRouter = require('./routes/createPost');
require("dotenv").config();


passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));


//Use CORS
app.use(cors(corsOptions)) // Use this after the variable declaration
// app.use(cors({origin: 'http://localhost:3001'}));
//Mongoose setup:

const mongoPw = process.env.MONGOPW;
const mongoDb = "mongodb+srv://tcheng:" + mongoPw + "@cluster0.noy7cwp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Establish facebook session

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
  
    res.send({user: req.user});
  });




app.use(passport.authenticate('session'));


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/showpage', showPageRouter);
// app.use('/signup', signupRouter);
app.use('/timeline', timelineRouter);
app.use('/posts', postRouter);

//Helper function for logging in
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});



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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));