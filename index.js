var express = require('express');
var request = require('request');
var nlp      = require('./nlp.js');
var bodyParser = require('body-parser');
var app = express();
var Slackhook = require('slackhook');
var calendarApi = require('./calendarApi');
var slackApi = require('./slackApi');
var slack = new Slackhook({
    domain: 'hackemorygroup.slack.com',
    token: 'rdNKT6iSLcUvk8DYSi6Lw7na'
});
var portNum = process.env.PORT || 8888;
var slackWebhookUrl = 'https://hooks.slack.com/services/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';

app.use(bodyParser.urlencoded());

app.post('/', function(req, res) {
    var hook = slack.respond(req.body);
    var msg = hook.text;
    sendMessage(msg);
    res.send("fdsfsa");
});

app.get('/penis', function(req, res) {
    slackApi.auth();
    res.send('fdsagdsa');
});

app.post('/slack', function(req, res) {
  var hook = slack.respond(req.body);
  var msg = hook.text;
  sendMessage("Event "+msg+" was saved to calendar");
  slackApi.getEmails().then(function(emails) {
    calendarApi.addEvent(emails, msg);
  });
  res.send("sfdsa");
})

app.get('/checkMsg', function(req, res) {
  request(nlp.dateTimeOptions, nlp.callback);
  //request(nlp.alch.options, nlp.alch.callback);
  return res.send('/checkMsg ran');
})

function sendMessage(msg) {
  request({
    method: 'POST',
    uri: slackWebhookUrl,
    json: {
      text: msg
    }
  }, function(error, response, body) {
  });
}

app.listen(portNum, () => {
  if (!process.env.PORT) {
    console.log("Serving port number " + portNum);
  }
})


