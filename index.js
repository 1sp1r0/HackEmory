var express = require('express');
var request = require('request');
var app = express();

var portNum = process.env.PORT || 8888

app.get('/', function(req, res) {
  return res.send("Hello World");
})


//add gzip encoding
var trOptions = {
    url: 'https://api.textrazor.com',
    headers: {
        'X-TextRazor-Key': '9663941647bdd337d3697c8d80b5740d39658e5e49ff2819db2b37d3'
    }
}

function trCallback(err, resp, body) {
  if (!err && resp.statusCode === 200) {
      var info = JSON.parse(body);
      console.log("200: " + info);
  } else {
      console.log("" + resp.statusCode + ": " + info);
  }
}

app.get('/checkMsg', function(req, res) {
  request(trOptions, trCallback)
  return res.send('/checkMsg ran')
})

app.listen(portNum, () => {
  if (!process.env.PORT) {
    console.log("Serving port number " + portNum)
  }
})
