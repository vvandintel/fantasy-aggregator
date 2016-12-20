const logSettings = require('../../log/logConfig');
const logger = logSettings.configure('app.log');
const Leader = require('../../model/leader.js');

module.exports = (req, res) => {
 const id = req.params.id;

 Leader.findById(id, (err, leader) => {
  if (err) {

   logger.error(err);
   res.render('error', 'Issue rendering weekly leaders view by specified week');
  }

  try {
   const positions = leader.positions[0];

   res.render('weeklyLeadersByWeekView', {
    title: `Week ${leader.week} Leaders`,
    positions,
    week: leader.week
   });
  } catch (err) {
   res.render('error', err);
  }
 });
};