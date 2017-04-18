const express       = require('express'),
      router        = express.Router(),
      passport      = require('passport'),
      Campground    = require('../models/campground');

router.get('/',(req,res) => {
  // Get  all campgrounds from DB.
  Campground.find({},(err,allCampgrounds) =>{
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/campgrounds',{campgrounds:allCampgrounds});
    }
  });
});

router.post('/', isLoggedIn, (req,res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.desc;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = { name: name, image: image, description: desc, author:author};
  Campground.create(newCampground, (err, newlyCreated) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

router.get('/new', isLoggedIn, (req,res) => {
  res.render('campgrounds/new');
})

router.get('/:id',(req,res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      res.render('campgrounds/edit', {campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id',checkCampgroundOwnership, (req, res) => {
  //Find and update the correct campground

  Campground.findByIdAndUpdate(req.params.id,req.body.campground, (err, updatedCampground) => {
    if(err){
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

//DESTROY CAMPGROUND ROUTE
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, (err, foundCampground) => {
      if(err){
        res.redirect('back');
      } else {
        // does user own the campground?
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else{
    res.redirect('back');
  }
}

module.exports = router;