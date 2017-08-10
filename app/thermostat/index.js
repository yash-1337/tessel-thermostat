var alexa = require("alexa-app");
var axios = require('axios');

var app = new alexa.app("thermostat");

app.pre = function (request, response, type) {
  if (request.sessionDetails.application.applicationId !== "amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe") {
    // Fail ungracefully
    return response.fail('Invalid applicationId: ' + request.sessionDetails.application.applicationId);
  }
};

app.launch(function(request, response) {
  response.say("What would you like to know?");
});

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
        response.say("The relative humidity is " + res.data.humidity + " percent.");
      })
      .catch(function (error) {
        response.say("An error occured!");
      });

  }
);

module.exports = app;