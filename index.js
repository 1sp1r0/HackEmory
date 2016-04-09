var express = require('express');
var request = require('request');
var nlp      = require('./nlp.js');
var parser   = require('./parser.js');
var bodyParser = require('body-parser');
var app = express();
var Slackhook = require('slackhook');
var slack = new Slackhook({
    domain: 'hackemorygroup.slack.com',
    token: 'rdNKT6iSLcUvk8DYSi6Lw7na'
});
var portNum = process.env.PORT || 8888;
var slackWebhookUrl = 'https://hooks.slack.com/services/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';

app.use(bodyParser.urlencoded());

app.post('/', function(req, res){
    var hook = slack.respond(req.body);
    var msg = hook.text;
    //res.json({text: 'Hi ' + hook.user_name, username: 'Dr. Nick'});
    sendMessage(msg);
    res.send("fdsfsa");
});

app.get('/sendMsg', function(req, res) {
  sendMessage("hello");
  res.send("Hello World");
})

app.get('/checkMsg', function(req, res) {
  //request(nlp.relationOptions, nlp.callback);
  //request(nlp.alch.options, nlp.alch.callback);
  return res.send('/checkMsg ran');
})

app.get('/tagTest', function(req, res) {
  parser('This is some sample text. This text can contain multiple sentences.');
  return res.send('/tagTest sent');
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


