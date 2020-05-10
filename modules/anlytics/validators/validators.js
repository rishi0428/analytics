
/**
 * Created by Rishikesh on 10/05/20.
 */

const Joi = require('joi');
const validator = require('./../../../validators');
const apiReferenceModule = "analytics";

function userValidation(req, res, next) {
  req.apiReference = {
    module: apiReferenceModule,
    api: "userAnalytics"
  };

  let schema = Joi.object().keys({
    filter: Joi.array().items(
      Joi.object().keys({
        key: Joi.string().required(),
        value: Joi.string().required()
      }).required()
    ).required(),
    analysis: Joi.array().items(Joi.string().valid("mean", "median", "variance", "mode", "range")).required()
  });
  let validFields = validator.validateFields(req.apiReference, req.body, res, schema);
  if (validFields) {
    next();
  }
}

module.exports = { userValidation };