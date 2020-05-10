/**
 * Created by Rishikesh on 10/05/20.
 */

const constants = require('./../../../properties/constants');
const responses = require('./../../../response/responses');
const services = require('./../services/services');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * gets filter and provides analytics like mean, median, variance
 */
async function getUserStatistics(req, res) {
	try {
		let filter = req.body.filter;
		let analysis = req.body.analysis;
		let result = await services.getAnalyticsData(req.apiReference, { filter, analysis });
		return responses.actionCompleteResponse(res, result, constants.RESPONSE_MESSAGES.ACTION_COMPLETE, req.apiReference);
	} catch (error) {
		return responses.sendError(res, {}, req.apiReference);
	}
}

module.exports = { getUserStatistics }