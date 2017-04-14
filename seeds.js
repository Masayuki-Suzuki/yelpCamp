const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Salmon Creek',
    image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus esse et inventore labore obcaecati recusandae voluptate voluptates! Dolorem expedita ipsum, laborum minus modi, odit officia qui rem, sint sunt voluptate.'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus esse et inventore labore obcaecati recusandae voluptate voluptates! Dolorem expedita ipsum, laborum minus modi, odit officia qui rem, sint sunt voluptate.'
  },
  {
    name: 'Mountain Goat\'s Rest',
    image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus esse et inventore labore obcaecati recusandae voluptate voluptates! Dolorem expedita ipsum, laborum minus modi, odit officia qui rem, sint sunt voluptate.'
  }
]

function seedDB(){
  //Remove all campgrounds
  Campground.remove({},(err) => {
    if(err){
      console.log(err);
    }
    console.log('remove campgrounds!');
    //add a few campgrounds
    data.forEach( (seed) => {
      Campground.create(seed,(err,campground) => {
        if(err){
          console.log(err);
        } else {
          console.log('added camp data');
          //create a comment
          Comment.create(
            {
              text:"This place is grate. but I wish there was internet",
              author : "Homer"
            }, (err,comment)=>{
              if(err){
                console.log(err)
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created new comment');
            }
          });
        }
      });
    });
  });
}
module.exports = seedDB;