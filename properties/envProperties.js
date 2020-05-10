/**
 * Created by Rishikesh on 10/05/20.
 */

const config = require('config');

const port = process.env.PORT || config.get('PORT');

function isEnv(env) {
  return process.env.NODE_ENV == env;
}

function isEnvLiveOrBeta() {
  return isEnv('live') || isEnv('beta');
}

function isEnvLive() {
  return isEnv('live');
}

function getEnv() {
  return process.env.NODE_ENV;
}

function isServer(server) {
  return process.env.SERVER == server;
}

module.exports = {isEnv, getEnv, isEnvLiveOrBeta, isEnvLive, isServer, port};