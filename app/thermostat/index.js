var alexa = require("alexa-app");
var axios = require('axios');

var app = new alexa.app("thermostat");

app.pre = function (request, response, type) {
    if (request.sessionDetails.application.applicationId !== process.env.APP_ID) {
        // Fail ungracefully
        throw 'Invalid applicationId: ' + request.sessionDetails.application.applicationId;
    }
};


app.intent("TemperatureIntent", {
    "slots": {},
    "utterances": ["temperature inside"]
  },
  function (request, response) {
    response.say("Temperature");
    return axios("https://api.ipify.org/?format=json")
      .then(function (res) {
        response.say("the temperature is " + res.data.ip + " degrees.");
      })
      .catch(function (error) {
        response.say("An error occured!");
      });
  }
);

app.intent("HumidityIntent", {
    "slots": {},
    "utterances": ["humidity inside"]
  },
  function (request, response) {
    response.say("Humidity");
    return axios.get('https://api.ipify.org/?format=json')
      .then(function (res) {
        response.say("The humidity is " + res.data.ip + " percent.");
      })
      .catch(function (error) {
        response.say("An error occured!");
      });

  }
);

module.exports = app;