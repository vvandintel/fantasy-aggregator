const logSettings = require('../../log/logConfig');
const Leader = require('../../model/leader.js');
const moment = require('moment');

const logger = logSettings.configure();

function saveLeader(newData) {
 const newLeader = new Leader({
  season: newData.season,
  week: newData.week,
  positions: newData.positions,
  timestamp: moment(Date.now()).format('MM/DD/YYYY HH:mm')
 });
 
 newLeader.save((err) => {
  if (err) {
   logger.error('Error saving leader rankings : %s', err);
  }
 });
}

module.exports.execute = saveLeader;