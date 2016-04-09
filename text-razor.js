var request = require('request');

module.exports = {
    options: {
        formData: {
           text: 'We going to the park on Thursday!',
           extractors: 'words',
        },
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
          console.log("resp:" + resp);
          console.log("200: " + body);
      } else {
          console.log("" + resp.statusCode + ": " + body);
      }
    },
}
