const NewsArchive = require('../../model/newsArchive.js');
const logSettings = require('../../log/logConfig');

const logger = logSettings.configure('app.log');

module.exports = (req, res) => {
 NewsArchive.find({}, (err, newsArchive) => {
  if (err) {
   logger.error(err);
   res.status(500).send('Error displaying player news archive');
  } else {
   res.json(newsArchive);
  }
 });
};