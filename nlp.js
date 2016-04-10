var request = require('request');

module.exports = {
    relationOptions: {
            form: {
              text: 'We should go to Emory University this Tuesday at 6 pm',
              apikey: '42517e512003fd0f9adeaa00bf892c58e5e8eb09',
              outputMode: 'json',
              showSourceText: 0,
            },
            method: 'POST',
            url: 'https://gateway-a.watsonplatform.net/calls/text/TextGetRankedNamedEntities',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
        },

    dateTimeOptions: {
            form: {
               apikey: '42517e512003fd0f9adeaa00bf892c58e5e8eb09',
               outputMode: 'json',
               showSourceText: 0,
               anchorDate: '2016-04-09 11:11:11',
               text: 'We should go to Emory University next Thursday at 6 PM.',
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
