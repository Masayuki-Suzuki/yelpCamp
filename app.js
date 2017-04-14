const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      Campground    = require('./models/campground'),
      Comment       = require('./models/comment'),
      seedDB        = require('./seeds'),
      port          = 3000,
      ip            = '127.0.0.1';

seedDB();
mongoose.connect('mongodb://localhost/yelpCamp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));


// Campground.create(
//   {
//     name: 'Granite Hill',
//     image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg',
//     description: 'This is a huge granite hill, no bathrooms. no water. Beautiful granite!!'
//   } , (err, campground) => {
//   if(err){
//     console.log('It was Occarred some error. Should check some code....');
//     console.log(err);
//   } else {
//     console.log('NEWLY CREATED');
//     console.log(campground);
//   }
// });

// var campgrounds = [
//   {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
//   {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
//   {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
//   {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
//   {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
//   {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
//   {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
//   {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
//   {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
//   {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
//   {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
//   {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'}
// ];

app.get('/',(req,res) => {
  res.render('campgrounds/index');
});

app.get('/campgrounds',(req,res) => {
  // Get  all campgrounds from DB.
  Campground.find({},(err,allCampgrounds) =>{
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/campgrounds',{campgrounds:allCampgrounds});
    }
  });
});

app.post('/campgrounds',(req,res) => {
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


app.get('/campgrounds/new', (req,res) => {
  res.render('campgrounds/new');
})

app.get('/campgrounds/:id',(req,res) => {
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

// // SHOW - shows more info about one campground
// app.get("/campgrounds/:id", function(req, res){
//   //find the campground with provided ID
//   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log(foundCampground)
//       //render show template with that campground
//       res.render("campgrounds/show", {campground: foundCampground});
//     }
//   });
// });


//-------------------------
// COMMENTS ROUTES
//-------------------------
app.get('/campgrounds/:id/comments/new',(req,res)=>{
  Campground.findById(req.params.id,(err,campgraund) => {
    if(err){
      console.log(err);
    } else {
      res.render("comment/new", {campground: campgraund});
    }
  });
});

app.post('/campgrounds/:id/comments', (req,res) => {
  //lookup campground using ID
  Campground.findById(req.params.id, (err,campground) => {
    if(err){
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  })
  //create new comment
  //connect new comment to campground
  //redirect campground show page
});


app.listen(port,ip,() => {
  console.log('SERVER HAS STARTED!!');
});
