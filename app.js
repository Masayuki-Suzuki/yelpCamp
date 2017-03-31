const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));

const port = 3000;
const ip = '127.0.0.1';

var campgrounds = [
  {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
  {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
  {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
  {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
  {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
  {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
  {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
  {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'}
];

app.get('/',(req,res) => {
  res.render('index');
});

app.get('/campgrounds',(req,res) => {
  res.render('campgrounds',{campgrounds:campgrounds});
});

app.post('/campgrounds',(req,res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image}
  campgrounds.push(newCampground);

  console.log('campgrounds name : ' + campgrounds[3].name + '\nimage url : ' + campgrounds[3].image);
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req,res) => {
  res.render('new');
})

app.listen(port,ip,() => {
  console.log('SERVER HAS STARTED!!');
});
