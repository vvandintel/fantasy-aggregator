const request = require('request');
const logSettings = require('../../log/logConfig');
const savePlayerNews = require('./savePlayerNews');
const saveWeeklyLeaders = require('./saveWeeklyLeaders');

const logger = logSettings.configure('fantasyService.log');

const requestData = (requestUrl, type) => {
 const options = {
  uri: requestUrl,
  headers: {
   'Content-type': 'application/json'
  }
 };
 request(options, requestUrl, (err, res, body) => {
  if (err) {
   const message = `Issue requesting fantasy data: ${err}`;
   logger.error(message);
   //return callback(err);
  } else {
   //return callback(null, body);
   switch (type) {
   case 'news':
    savePlayerNews.execute(body);
    break;
   case 'leaders':
    saveWeeklyLeaders.execute(body);
    break;
   default:
    logger.error('Specified data type not found!');
    break;
   }
  }
 });
};

module.exports.requestData = requestData;