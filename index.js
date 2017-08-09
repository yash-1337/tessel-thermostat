var alexa_app = require("alexa-app");
//var axios = require('axios');
var express = require("express");
//var verifier = require('alexa-verifier-middleware');

var app = express();

var alexa = new alexa_app.app("thermostat");

alexa.intent("TemperatureIntent", {
    "slots": {},
    "utterances": ["temperature inside"]
  },
  function (request, response) {
    response.say("Temperature");
    /*return axios("https://api.ipify.org/?format=json")
      .then(function (res) {
        response.say("the temperature is " + res.data.ip + " degrees.");
      })
      .catch(function (error) {
        response.say("An error occured!");
      });*/
  }
);

alexa.intent("HumidityIntent", {
    "slots": {},
    "utterances": ["humidity inside"]
  },
  function (request, response) {
    response.say("Humidity");
    /*return axios.get('https://api.ipify.org/?format=json')
      .then(function (res) {
        response.say("The humidity is " + res.data.ip + " percent.");
      })
      .catch(function (error) {
        response.say("An error occured!");
      });*/

  }
);


//app.use(verifier);
alexa.express({ expressApp: app, debug: true });

app.listen(3000);