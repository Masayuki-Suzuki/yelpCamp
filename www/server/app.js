var express = require('express');
var app = express();

var port = 3000;
var ip = '127.0.0.1';

app.get('/',function(req,res){
  res.send('<body>EXPRESS CONNECTED.</body>');
});

app.listen(port,ip,() => {
  console.log('SERVER HAS STARTED!!');
});
