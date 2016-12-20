const cron = require('cron');
const playerNews = require('./getPlayerNews');
const weeklyLeaders = require('./getWeeklyLeaders');
const logSettings = require('../../log/logConfig');

const logger = logSettings.configure('fantasyService.log');

/* runs every ten minutes */
//const timer = '0 */10 * * * *';
/* debug: runs every minute */
//const timer = '* * * * *';
/* runs every 20 seconds */
const leaderTimer = '*/20 * * * * *';

/* runs every 20 minutes */
const newsTimer = '0 */20 * * * *';

const leaderCronJob = cron.job(leaderTimer, () => {
 logger.info('Leader cron job started');
 
 weeklyLeaders.fetch();

 logger.info('Leader cron job completed');
});

const newsCronJob = cron.job(newsTimer, () => {
 logger.info('News cron job started');
 
 playerNews.fetch();

 logger.info('News cron job completed');
});

module.exports.start = () => {
 leaderCronJob.start();
 newsCronJob.start();
};