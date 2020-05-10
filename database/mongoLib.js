/**
 * Created by Rishikesh on 10/05/20.
 */

const MongoClient                                 = require('mongodb').MongoClient;

const logging                                     = require('./../logging/logging');
const dateUtility                                 = require('./../utilities/dateUtility');

function initialize(apiReference, opts) {
  return new Promise((resolve, reject) =>{
    logging.log(apiReference, "STARTING MONGO CONNECTION @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
    MongoClient.connect(opts.connectionString, opts.mongoOptions, function (err, conn) {
      if (err) {
        logging.logError(apiReference, {EVENT : "MONGO_CONN_ERR", ERR : err});
        return reject(err);
      }
      logging.log(apiReference, "MONGO CONNECTED @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
      conn = conn.db(config.get("mongo_database"))
      return resolve(conn);
    });
  });
}

function aggregate(apiReference, collectionName, condition){
  return new Promise((resolve, reject) => {
    let cursor = db.collection(collectionName).aggregate(condition);
    
    if ( cursor ){
      cursor.toArray(function (err, result){
        logging.log(apiReference, {event : "aggregate", collection : collectionName, condition : condition, result : result , error : err});
        cursor.close();
        if ( err ){
          return reject(err);
        }
        return resolve(result);
      });
    } else{
      logging.logError(apiReference, {EVENT : "find", ERR : "invalid mongo query", collectionName : collectionName, condition : condition});
      reject(new Error("invalid mongo query"));
    }
  })
}

module.exports = {initialize, aggregate};