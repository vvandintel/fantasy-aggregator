const Leader = require('../../model/leader.js');
const logSettings = require('../../log/logConfig');

const logger = logSettings.configure('app.log');

//need to order by first/last then timestamp, retrieve last 49/50?
module.exports = (req, res) => {
 const id = req.params.id;

 Leader.findById(id, (err, leader) => {
  if (err) {
   logger.error(err);
   res.status(500).send('Error displaying weekly leaders by week');
  } else {
   res.json(leader);
  }
 });
};