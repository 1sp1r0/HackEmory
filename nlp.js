var request = require('request');

module.exports = {
    tr: {
        options: {
            form: {
               text: 'We going to the park on Thursday!',
               extractors: 'words',
            },
            method: 'POST',
            url: 'https://api.textrazor.com/',
            headers: {
                'X-TextRazor-Key': '9663941647bdd337d3697c8d80b5740d39658e5e49ff2819db2b37d3',
                'User-Agent': 'swagmeout1337',
                'Content-Type':'application/x-www-form-urlencoded',
            }
        },

        callback: function (err, resp, body) {
          if (!err && resp.statusCode === 200) {
              var info = JSON.parse(body);
              console.log("200: " + info.response.sentences[0].position);
          } else {
              console.log("" + resp.statusCode + ": " + body);
          }
        },
    },

    alch: {
        options: {
            form: {
               apikey: '42517e512003fd0f9adeaa00bf892c58e5e8eb09',
               outputMode: 'json',
               showSourceText: 0,
               anchorDate: '2016-04-09',
               text: 'going to the park next Thursday!',
            },
            method: 'POST',
            url: 'https://gateway-a.watsonplatform.net/calls/text/TextExtractDates',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        },

        callback: function (err, resp, body) {
          if (!err && resp.statusCode === 200) {
              var info = JSON.parse(body);
              console.log("200: " + body);
          } else {
              console.log("" + resp.statusCode + ": " + body);
          }
        },
    }
}
