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
  let newCampground = { name: name, image: image, description: desc}
  console.log(newCampground);
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
      console.log(foundCampground);
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;