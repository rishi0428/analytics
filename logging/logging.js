let moment = require('moment');
let envProperties = require('./../properties/envProperties');

let debugging_enabled = true;

if (envProperties.isEnvLive()) {
  debugging_enabled = false;
}

let fileSwitches = {
  startup: true,
  analytics: true
};

let modules = {
  startup: {
    initialize: true
  },
  analytics: {
    userAnalytics: true
  }
};

function log(apiReference, log) {
  if (debugging_enabled
    && apiReference
    && apiReference.module
    && apiReference.api
    && fileSwitches
    && fileSwitches[apiReference.module] == true
    && modules
    && modules[apiReference.module]
    && modules[apiReference.module][apiReference.api] == true) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.log("-->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
}

function logError(apiReference, log) {
  if (apiReference
    && apiReference.module
    && apiReference.api) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.error("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
}

module.exports = { log, logError };