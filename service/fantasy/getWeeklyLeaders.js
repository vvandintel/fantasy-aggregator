const logSettings = require('../../log/logConfig');
const logger = logSettings.configure('fantasyService.log');

const requestUrl = 'http://api.fantasy.nfl.com/v1/players/scoringleaders?format=json&sort=pts';
const fantasy = require('./getFantasyData');

module.exports.fetch = () => {
 fantasy.requestData(requestUrl, 'leaders', logger.log);
 logger.info('requested weekly leaders');
};