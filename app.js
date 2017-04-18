const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      passport        = require('passport'),
      LocalStrategy   = require('passport-local'),
      methodOverride  = require('method-override'),
      User            = require('./models/user'),
      seedDB          = require('./seeds'),
      port            = 3000,
      ip              = '127.0.0.1';

const campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes    = require('./routes/comments'),
      indexRoutes      = require('./routes/index');

// Seed the database.
// seedDB();

mongoose.connect('mongodb://localhost/yelpCamp');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Once again Curry wins most yummy food',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

app.listen(port,ip,() => {
  console.log('SERVER HAS STARTED!!');
});
