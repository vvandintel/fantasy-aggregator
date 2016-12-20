const Leader = require('../../model/leader.js');
const logSettings = require('../../log/logConfig');

const logger = logSettings.configure('app.log');

module.exports = (req, res) => {
 Leader.find({}, (err, leaders) => {
  if (err) {
   logger.error(err);
   res.status(500).send('Error displaying weekly leaders');
  } else {
   res.json(leaders);
  }
 });
};