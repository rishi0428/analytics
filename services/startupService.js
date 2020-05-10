/**
 * Created by Rishikesh on 10/05/20.
 */

const apiReferenceModule  = "startup";

const logging             = require('../logging/logging');
const envProperties       = require('../properties/envProperties');
const httpLib             = require('./httpService');
const database            = require('./../database');

async function initializeServer() {
    let apiReference = {
      module: apiReferenceModule,
      api: "initialize"
    };
    try {
      await database.initialize(apiReference);
      await httpLib.startHttpServer(envProperties.port);
    } catch (error) {
      logging.logError(apiReference, {EVENT: "initializeServer", ERROR: error});
      throw new Error(error);
    }
}

module.exports ={initializeServer}