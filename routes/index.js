const express       = require('express'),
      router        = express.Router(),
      passport      = require('passport'),
      User          = require('../models/user');

router.get('/',(req,res) => {
  res.render('campgrounds/index');
});

//=================
// AUTH ROUTES
//=================

// show register form
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req,res, () => {
      req.flash('success','Welcome to YelpCamp ' + user.username);
      res.redirect('/campgrounds');
    });
  });
});

// show login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Logic logout route
router.get('/logout', (req,res) => {
  req.logout();
  req.flash('success','Logged you out');
  res.redirect('/campgrounds');
})

// handling login logic
// app.post('ROUTE',Middleware, Callback);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  successFlash: 'Welcome back to YelpCamp!!',
  failureRedirect: '/login',
  failureFlash: 'Failed!! Username or Password is wrong...'
}), (req, res) => {});

module.exports = router;