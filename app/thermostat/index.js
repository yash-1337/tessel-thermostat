var alexa = require("alexa-app");
var axios = require('axios');

var app = new alexa.app("thermostat");

app.pre = function (request, response, type) {
  if (request.sessionDetails.application.applicationId !== process.env.APP_ID) {
    // Fail ungracefully
    return response.fail('Invalid applicationId: ' + request.sessionDetails.application.applicationId);
  }
};

app.launch(function(request, response) {
  response.say("What would you like to know?");
  response.shouldEndSession(false);
});

app.intent("AMAZON.HelpIntent",{
  "slots": {},
  "utterances": []
}, function(request, response) {
  	var helpOutput = "You can say 'temperature inside' or 'humidity inside'. You can also say stop or exit to quit.";
  	var reprompt = "What would you like to do?";
  	// AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
  	response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
  	return
});

app.intent("AMAZON.StopIntent",{
  "slots": {},
  "utterances": []
}, function(request, response) {
  	var stopOutput = "Ok. Request has been cancelled. Good-bye!";
  	response.say(stopOutput);
  	return
});

app.intent("AMAZON.CancelIntent",{
  "slots": {},
  "utterances": []
}, function(request, response) {
  	var cancelOutput = "Request has been cancelled. See you later!";
  	response.say(cancelOutput);
  	return
});

app.intent("TemperatureIntent", {
    "slots": {},
    "utterances": ["temperature inside"]
  },
  function (request, response) {
    return axios("http://73.232.58.52/temperature")
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
    return axios.get("http://73.232.58.52/humidity")
      .then(function (res) {
        response.say("The relative humidity is " + res.data.humidity + " percent.");
      })
      .catch(function (error) {
        response.say("An error occured!");
      });
  }
);

module.exports = app;