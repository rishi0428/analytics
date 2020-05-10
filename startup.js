
process.env.NODE_CONFIG_DIR       = 'config/';
config                            = require('config');

let app                           = require('express')();
global.app                        = app;

require('./middlewares');
require('./modules');
require('./services/startupService').initializeServer();
