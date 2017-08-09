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
    return axios(process.env.TESSEL_URL + "temperature")
      .then(function (res) {
        response.say("the temperature is " + res.data.temperature + " degrees.");
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
    return axios.get(process.env.TESSEL_URL + "humidity")
      .then(function (res) {
        response.say("The humidity is " + res.data.humidity + " percent.");
      })
      .catch(function (error) {
        response.say("An error occured!");
      });

  }
);

module.exports = app;