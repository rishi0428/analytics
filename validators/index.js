/**
 * Created by Rishikesh on 10/05/20.
 */

let Joi = require('joi');

let logging = require('./../logging/logging');
let response = require('./../response/responses');

function validateFields(apiReference, req, res, schema) {
    logging.log(apiReference, { REQUEST_BODY: req });
    let validation = Joi.validate(req, schema);
    if (validation.error) {
        let errorReason =
            validation.error.details !== undefined
                ? validation.error.details
                : 'Parameter missing or parameter type is wrong';
        logging.log(apiReference, validation.error.details);
        response.parameterMissingResponse(res, errorReason);
        return false;
    }
    return true;
}

module.exports = { validateFields };