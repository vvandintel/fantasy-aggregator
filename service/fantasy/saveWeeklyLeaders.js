const logSettings = require('../../log/logConfig');
const Leader = require('../../model/leader.js');
const saveLeader = require('./saveLeader.js');
const updateLeader = require('./updateLeader.js');

const logger = logSettings.configure('fantasyService.log');

function execute(data) {
 const leaderData = JSON.parse(data);

 Leader.find({}, (err, leaders) => {
  if (err) {
   logger.error('Error : %s ', err);
  } else {
   /*update if data for current week exists, otherwise insert new */
   if (leaders.length > 0) {
    let newData = false;
    let updateId = '';

    for (let i = 0; i < leaders.length; i++) {
     if (leaderData.week == leaders[i].week) {
      newData = false;
      updateId = leaders[i]._id;
      break;
     } else if (leaderData.week > leaders[i].week) {
      newData = true;
      continue;
     } else {
      break;
     }
    }

    /* save if new, otherwise update existing */
    if (newData) {
     logger.info('Saving this week\'s leaders');
     saveLeader.execute(leaderData);
    } else {
     logger.info('Updating this week\'s leaders');
     updateLeader.execute(updateId, leaderData);
    }
   } else {
    logger.info('Saving inital data: This week\'s leaders');
    saveLeader.execute(leaderData);
   }
  }
 });
}

module.exports.execute = execute;