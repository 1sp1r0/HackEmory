var exports = module.exports = {};

var request = require('request');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var clientId = '251792856570-2fh9kdcodi9ff2jn8ek3begjj2ug0tr9.apps.googleusercontent.com/';
var clientSecret = 'inXcgNL4UBvEq1klsspketfj';

/*exports.auth = function() {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, 'https://example.com/hackemory/');
  oauth2Client.getToken()
}*/

exports.addEvent = function(emails, text, date, location, title) {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    console.log(text);
    authorize(JSON.parse(content), addEvent, emails, text, date, location, title);
  });
}

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, emails, text, date, location, title) {
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, emails, text, date, location, title);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}

function addEvent(auth, emails, text, date, location, title) {
  var calendar = google.calendar('v3');
  var timeRegex = text.match(/([1-9]|1[0-2])(:[0-5][0-9])? *(pm|am|PM|AM)/);
  console.log("before parsing"+date);
  var hours = "00";
  var minutes = ":00";
  var endHours = "23";
  var endMinutes = ":00";
  var isAm = true;
  if (timeRegex) {
    hours = timeRegex[1].length == 2 ? timeRegex[1] : "0"+timeRegex[1];
    console.log(hours);
    minutes = timeRegex[2] || ":00";
    console.log(minutes);
    isAm = timeRegex[3] && (timeRegex[3] === 'pm' || timeRegex[3] === 'PM') ? false : true;
    hours = isAm ? hours : ("" + (parseInt(hours) + 12));
    endHours = "" + (parseInt(hours) + 1);
    endMinutes = minutes;
    endHours   = endHours === "24" ? "23" : endHours;
  }
  var parsedDate = date.substring(0, 4)+'-'+date.substring(4, 6)+'-'+date.substring(6, 8)+'T'+hours+minutes+':00-04:00';
  var parsedDate2 = date.substring(0, 4)+'-'+date.substring(4, 6)+'-'+date.substring(6, 8)+'T'+endHours+endMinutes+':00-04:00';
  console.log(parsedDate);
  console.log(parsedDate2);
  console.log(emails);
  var event = {
    'summary': title,
    'location': location,
    'description': text,
    'start': {
      //'dateTime': '2016-04-10T09:00:00-07:00',
      'dateTime': parsedDate,
      'timeZone': 'America/New_York',
    },
    'end': {
      //'dateTime': '2016-04-10T17:00:00-07:00',
      'dateTime': parsedDate2,
      'timeZone': 'America/New_York',
    },
    'attendees': emails,
  }
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}
