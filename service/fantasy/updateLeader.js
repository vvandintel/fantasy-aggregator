const logSettings = require('../../log/logConfig');
const Leader = require('../../model/leader.js');
const moment = require('moment');

const logger = logSettings.configure('fantasyService.log');

function updateLeader(id, updateData) {
 Leader.findById(id, (err, updateleader) => {
  updateleader.positions = updateData.positions;
  updateleader.timestamp = moment(Date.now()).format('MM/DD/YYYY HH:mm');

  updateleader.save((err) => {
   if (err) {
    logger.error('Error saving leader rankings : %s', err);
   }
  });
 });
}

module.exports.execute = updateLeader;