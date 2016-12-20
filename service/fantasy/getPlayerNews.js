const logSettings = require('../../log/logConfig');
const logger = logSettings.configure('fantasyService.log');

const requestUrl = 'http://api.fantasy.nfl.com/v1/players/news?format=json';
const fantasy = require('./getFantasyData');

module.exports.fetch = () => {
 fantasy.requestData(requestUrl, 'news', logger.log);
 logger.info('requested player news');
};