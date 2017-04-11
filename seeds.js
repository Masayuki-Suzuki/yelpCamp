const mongoose      = require('mongoose'),
      Campground    = require('./models/campground'),
      Comment       = require('./models/comment');

const data = [
  {
    name: 'Salmon Creek',
    image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg',
    description : 'This campground is nearby the creek.'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg',
    description: 'This is a huge granite hill, no bathrooms. no water. Beautiful granite!!'
  },
  {
    name: 'Mountain Goat\'s Rest',
    image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg',
    description: 'Blah blah blah'
  }
]

function seedDB(){
  //Remove all campgrounds
  console.log(Campground.comments);
  Campground.remove({},(err) => {
    if(err){
      console.log(err);
    } else {
      console.log('remove campgrounds!');
    }
    //add a few campgrounds
    data.forEach(function (seed) {
      Campground.create(seed,(err,data)=>{
        if(err){
          console.log(err);
        } else {
          console.log('added camp data');
          //create a comment
          Comment.create({
            text:"This place is grate. but I wish there was internet",
            author : "Homer"
          }, (err,comment)=>{
            if(err){
              console.log(err)
            } else {
              // Campground.comments.push(comment);
              // Campground.save();
              console.log('Created new comment');
            }
          });
        }
      });
    });
  });
}
module.exports = seedDB;