/**
 * Created by Rishikesh Arya on 10/05/20.
 */

const mongoLib     = require('./mongoLib');
const dbProperties = require('./dbProperties');

global.db = undefined;

async function initialize(apiReference) {
  db = await mongoLib.initialize(apiReference, dbProperties.mongo);
}

module.exports ={initialize};