const mongoose = require('mongoose');
const appEnv = require('../util/env.js');
const logSettings = require('../log/logConfig.js');

const logger = logSettings.configure('app.log');

//setting Mongoose promise to native ES6
mongoose.Promise = global.Promise;

const url = (appEnv.getServiceURL('fantasy-aggregator-mongod') || 'mongodb://localhost:27017/fantasy-aggregator-mongodb');

module.exports.connect = () => {
 mongoose.connect(url);
 logger.log('Opened database connection');
};