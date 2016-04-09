var exports = module.exports = {};

//var request = require('request');
var request = require('request-promise');

var clientId = '33368863828.33358616307';
var clientSecret = 'a7c5c8e13d04a18674babcdcf9dab0af';
var baseUrl = 'https://slack.com';
var code = '33368863828.33411500160.fd2c1ec918';
var shitUrl = baseUrl+'/oauth/authorize?client_id='+clientId+'&scope=users:read';
var tokenUrl = baseUrl+'/api/oauth.access?client_id='+clientId+'&client_secret='+clientSecret+'&code='+code;
var token = 'xoxp-33368863828-33390100114-33411114592-04660b9cb0';
var fs = require('fs');
var readline = require('readline');
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'penis.json';

/*exports.auth = function() {
  var options = {
    uri: shitUrl,
    method: 'GET',
  };
  console.log(shitUrl);
  request(options)
    .then(function (res) {
      //res.redirect()
    }).catch(function (err) {
      console.log(err);
    })
}*/

/*exports.getToken = function() {
  var options = {
    uri: tokenUrl,
    method: 'GET',
  };
  return request(options)
    .then(function(res) {
      token = JSON.parse(res).access_token;
      console.log(token);
      return token;
    })
}*/

exports.getEmails = function() {
  var options = {
    uri: baseUrl+'/api/users.list?token='+token,
    method: 'GET',
  };
  return request(options)
    .then(function (res) {
      var members = JSON.parse(res).members;
      members = members.map(function(member) {
        return member.profile.email;
      }).filter(function(email) {
        return email;
      }).map(function (email) {
        return { 'email': email };
      })
      return members;
    }).catch(function (err) {
      console.log(err);
    })
}
