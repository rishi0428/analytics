/**
 * Created by Rishikesh on 10/05/20.
 */

const config = require('config');

const mongo  = {
  connectionString: config.get("mongo_db_connection"),
  mongoOptions : { useUnifiedTopology: true }
};

module.exports = {mongo};