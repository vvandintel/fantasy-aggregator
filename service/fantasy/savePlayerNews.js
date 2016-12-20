const logSettings = require('../../log/logConfig');
const News = require('../../model/news.js');
const NewsArchive = require('../../model/newsArchive.js');
const moment = require('moment');

const logger = logSettings.configure('fantasyService.log');

function execute(data) {
 const jsonData = JSON.parse(data);
 const newsData = jsonData.news;

 /* first checking through all existing objects in database to determine if a data refresh is needed*/
 News.find({}, (err, news) => {
  if (err) {
   logger.error('Error : %s ', err);
  } else {
   for (let i = 0; i < newsData.length; i++) {
    let oldDate = new Date();

    if (news.length > 0) {
     if (typeof(moment(news[i].timestamp)) !== 'undefined') {
      oldDate = moment(Date.now()).format('MM/DD/YYYY HH:mm');
     } else {
      oldDate = moment(Date.now()).format('MM/DD/YYYY HH:mm');
     }

     const newDate = moment(newsData[i].timestamp);

     if (newDate.isAfter(oldDate)) {
      /* save current news to archive */
      if (i == 0) {
       const currentCache = [];
       currentCache.push(news);

       const archive = new NewsArchive({
        timestamp: moment(Date.now()).format('MM/DD/YYYY HH:mm'),
        newsList: currentCache
       });

       archive.save((err) => {
        if (err) {
         logger.error('Error saving player news : %s', err);
        }
       });

       logger.info('Current news cache archived');

       /* empty current news cache */
       News.remove({}, err => {
        if (err) {
         logger.error('Error emptying news cache : %s', err);
        } else {
         logger.info('News cache cleared');
         logger.info('Saving freshest player news...');
        }
       });

       //newIndex++;
      }

      const n = new News({
       firstName: newsData[i].firstName,
       lastName: newsData[i].lastName,
       position: newsData[i].position,
       teamAbbr: newsData[i].teamAbbr,
       body: newsData[i].body,
       analysis: newsData[i].analysis,
       timestamp: newsData[i].timestamp
      });

      n.save((err) => {
       if (err) {
        logger.error('Error saving player news : %s', err);
       }
      });
     }
    } else {
     const n = new News({
      firstName: newsData[i].firstName,
      lastName: newsData[i].lastName,
      position: newsData[i].position,
      teamAbbr: newsData[i].teamAbbr,
      body: newsData[i].body,
      analysis: newsData[i].analysis,
      timestamp: newsData[i].timestamp
     });

     if (i == newsData.length) {
      logger.info('Saving initial data...');
     }

     n.save((err) => {
      if (err) {
       logger.error('Error saving player news : %s', err);
      }
     });
    }
   }
  }
 });
}

module.exports.execute = execute;