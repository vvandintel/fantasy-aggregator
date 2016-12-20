const News = require('../../model/news.js');
const logSettings = require('../../log/logConfig');

const logger = logSettings.configure('app.log');

module.exports = (req, res) => {
 News.find({}, (err, news) => {
  if (err) {
   logger.error(err);
   res.status(500).send('Error displaying player news');
  } else {
   res.json(news);
  }
 });
};