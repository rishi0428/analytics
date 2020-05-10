const zlib                                  = require('zlib');

const logging                               = require('./../logging/logging');
const constants                             = require('./../properties/constants');

function parameterMissingResponse(res, err, data) {
  let response = {
    message: err || constants.RESPONSE_MESSAGES.PARAMETER_MISSING,
    status : constants.RESPONSE_FLAGS.PARAMETER_MISSING,
    data   : data || {}
  };
  res.send(JSON.stringify(response));
}

function actionCompleteResponse(res, data, msg, apiReference) {
  let response = {
    message: msg || constants.RESPONSE_MESSAGES.ACTION_COMPLETE,
    status : constants.RESPONSE_FLAGS.ACTION_COMPLETE,
    data   : data || {}
  };
  if (apiReference) {
    logging.log(apiReference, {EVENT: "FINAL RESPONSE", RESPONSE: response});
  }
  res.send(JSON.stringify(response));
}

function sendGzippedResponse(response, res) {
  zlib.gzip(JSON.stringify(response), function (err, zippedData) {
    if (err) {
      return res.send(response);
    }
    res.set({'Content-Encoding': 'gzip'});
    return res.send(zippedData);
  });
}

async function unzipResponse(apiReference, body) {
  return new Promise((resolve, reject) => {
    zlib.gunzip(body, function (err, dezipped) {
      if (err) {
        logging.logError(apiReference, {EVENT : "unzipResponse", ERROR : err, RESPONSE : dezipped });
        return reject(err);
      }
      return resolve(dezipped.toString());
    });
  });
}

function sendError(res, data, apiReference) {
  let response = {
    message:  constants.RESPONSE_MESSAGES.ERROR_IN_EXECUTION,
    status : constants.RESPONSE_FLAGS.ERROR_IN_EXECUTION,
    data   : data || {}
  };
  if (apiReference) {
    logging.log(apiReference, {EVENT: "FINAL RESPONSE", RESPONSE: response});
  }
  res.send(JSON.stringify(response));
}

module.exports = { parameterMissingResponse, actionCompleteResponse, sendGzippedResponse, unzipResponse, sendError }