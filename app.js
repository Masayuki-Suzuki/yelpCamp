var express = require('express');
var app = express();

app.set('view engine','ejs');

var port = 3000;
var ip = '127.0.0.1';

app.get('/',(req,res) =>{
  res.render('index');
});

app.listen(port,ip,() => {
  console.log('SERVER HAS STARTED!!');
});
