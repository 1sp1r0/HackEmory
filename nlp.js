var request = require('request');

module.exports = {
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
}
