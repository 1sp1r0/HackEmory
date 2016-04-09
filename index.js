var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

var portNum = process.env.PORT || 8888;
var slackWebhookUrl = 'https://hooks.slack.com/services/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';

app.use(bodyParser.json());

app.post('/', function(req, res) {
  console.log(req);
  return res.send("Hello World");
})

app.get('/sendMsg', function(req, res) {
  sendMessage("hello");
  res.send("Hello World");
})

function sendMessage(msg) {
  request({
    method: 'POST',
    uri: slackWebhookUrl,
    json: {
      text: msg
    }
  }, function(error, response, body) {
    console.log(response);
  });
}



app.listen(portNum, () => {
  if (!process.env.PORT) {
    console.log("Serving port number " + portNum);
  }
})


