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
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req,res, () => {
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
  res.redirect('/campgrounds');
})

// handling login logic
// app.post('ROUTE',Middleware, Callback);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {});

module.exports = router;