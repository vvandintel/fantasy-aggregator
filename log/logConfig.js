const winston = require('winston');
const moment = require('moment');

module.exports.configure = (fileName) => {
 const filePath = './log/' + fileName;
 const logger = new(winston.Logger)({
  transports: [
   new(winston.transports.Console)({
    timestamp: () => {
     return moment().format('MM/DD/YYYY HH:mm:ss');
    }
   }),
   new(winston.transports.File)({
    filename: filePath,
    level: 'silly',
    timestamp: () => {
     return moment().format('MM/DD/YYYY HH:mm:ss');
    }
   })
  ]
 });
 return logger;
};