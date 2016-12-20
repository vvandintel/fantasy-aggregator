const logSettings = require('../../log/logConfig');
const logger = logSettings.configure('app.log');
const Leader = require('../../model/leader.js');

module.exports = (req, res) => {
 Leader.find({}, (err, leaders) => {
  if (err) {
   logger.error(err);
   res.render('error', 'Issue rendering weekly leaders view');
  }
  res.render('weeklyLeadersView', {
   title: 'Weekly Leaders',
   leaders
  });
 });
};