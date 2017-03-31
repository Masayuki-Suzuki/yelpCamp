var express = require('express');
var app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

var port = 3000;
var ip = '127.0.0.1';

app.get('/',(req,res) => {
  res.render('index');
});

app.get('/campgrounds',(req,res) => {
  var campgrounds = [
    {name: 'Salmon Creek', image: 'https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg'},
    {name: 'Granite Hill', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg'},
    {name: 'Mountain Goat\'s Rest', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'}
  ]
  res.render('campgrounds',{campgrounds:campgrounds});
});

app.listen(port,ip,() => {
  console.log('SERVER HAS STARTED!!');
});
