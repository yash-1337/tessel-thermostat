var AlexaAppServer = require('alexa-app-server');
require('dotenv').config();

AlexaAppServer.start({
  server_root: __dirname,
  app_dir: 'app',
  port: process.env.PORT,
  debug: false,
  verify: false
});