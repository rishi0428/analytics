/**
 * Created by Rishikesh on 10/05/20.
 */

const analyticsUtility = require('./../../../utilities/analyticsUtility');
const mongoLib = require('./../../../database/mongoLib');
const constants = require('./../../../properties/constants');
const logging = require('./../../../logging/logging'); 

/**
 * 
 * @param {*} apiReference 
 * @param {*} opts contains filter array, analysis array
 */
async function getAnalyticsData(apiReference, opts) {
	try {
		let response = {};
		let mongoCondition = [
			{
				$match: {
					$and: []
				}
			},
			{
				$lookup: {
					from: 'Questions',
					localField: '_id',
					foreignField: 'userId',
					as: 'questions'
				}
			},
			{
				$unwind: "$questions"
			},
			{
				$project: {
					_id: 0,
					rating: "$questions.rating"
				}
			}
		]
		for (let i = 0; i < opts.filter.length; i++) {
			mongoCondition[0].$match.$and.push({ "profile": { "$elemMatch": { key: opts.filter[i].key, value: opts.filter[i].value } } });
		}

		let statisticsData = await mongoLib.aggregate(apiReference, constants.MONGO_COLLECTIONS.USERS, mongoCondition);
		logging.log(apiReference, {EVENT:"statisticsData", DATA:statisticsData});
		let data = statisticsData.map(x => x.rating);
		for (let option of opts.analysis) {
			switch (option) {
				case 'mean':
					response.mean = analyticsUtility.mean(data) || 0;
					break;
				case 'median':
					response.median = analyticsUtility.median(data) || 0;
					break;
				case 'mode':
					response.mode = analyticsUtility.mode(data);
					break;
				case 'range':
					response.range = analyticsUtility.range(data);
					break;
				case 'variance':
					response.variance = analyticsUtility.variance(data) || 0;
					break;
			}
		}
		return response
	} catch (error) {
		throw error;
	}
}

module.exports = { getAnalyticsData };