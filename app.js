const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      port          = 3000,
      ip            = '127.0.0.1';

mongoose.connect('mongodb://localhost/yelpCamp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name : String,
  image : String,
  description: String
});

var Campground = mongoose.model('Campground',campgroundSchema);

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
  res.render('index');
});

app.get('/campgrounds',(req,res) => {
  // Get  all campgrounds from DB.
  Campground.find({},(err,allCampgrounds) =>{
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds',{campgrounds:allCampgrounds});
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
  res.render('new');
})

app.get('/campgrounds/:id',(req,res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id, (err, foundCampground) =>{
    if(err){
      console.log('ERROR!!');
      console.log(err);
    } else {
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(port,ip,() => {
  console.log('SERVER HAS STARTED!!');
});
