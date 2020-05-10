/**
 * Created by Rishikesh on 10/05/20.
 */

const moment = require('moment');

const formats = {
  timeWithMilliSeconds    : 'YYYY-MM-DD HH:mm:ss SSS'
};

function getFormattedDate(date, format) {
  return moment(new Date(date)).format(format);
}

module.exports = {getFormattedDate, formats}