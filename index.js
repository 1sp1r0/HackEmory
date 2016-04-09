var express = require('express');
var app = express();

var portNum = process.env.PORT || 8888

app.get('/', function(req, res) {
  return res.send("Hello World");
})

app.listen(portNum, () => {
  if (!process.env.PORT) {
    console.log("Serving port number " + portNum)
  }
})
