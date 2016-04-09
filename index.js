var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var Slackhook = require('slackhook');
var slack = new Slackhook({
    domain: 'hackemorygroup.slack.com',
    token: 'rdNKT6iSLcUvk8DYSi6Lw7na'
});
var portNum = process.env.PORT || 8888;
var slackWebhookUrl = 'https://hooks.slack.com/services/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';


app.post('/', function(req, res){
    var hook = slack.respond(req.body);
    res.json({text: 'Hi ' + hook.user_name, username: 'Dr. Nick'});
});

app.get('/sendMsg', function(req, res) {
  sendMessage("hello");
  res.send("Hello World");
})

app.get('/checkMsg', function(req, res) {
  request(trOptions, trCallback)
  return res.send('/checkMsg ran')
})

// Text Razor optioins + callback
//add gzip encoding
var trOptions = {
    url: 'https://api.textrazor.com/entities/',
    headers: {
        'X-TextRazor-Key': '9663941647bdd337d3697c8d80b5740d39658e5e49ff2819db2b37d3'
    }
}

function trCallback(err, resp, body) {
  if (!err && resp.statusCode === 200) {
      var info = JSON.parse(body);
      console.log("200: " + body);
  } else {
      console.log("" + resp.statusCode + ": " + body);
  }
}

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


