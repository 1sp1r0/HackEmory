var express = require('express');
var app = express();

var portNum = process.env.PORT || 8888;
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies


app.post('/', function(req, res) {
  console.log(req.body);
  return res.send("Hello World");
})

app.listen(portNum, () => {
  if (!process.env.PORT) {
    console.log("Serving port number " + portNum)
  }
})


