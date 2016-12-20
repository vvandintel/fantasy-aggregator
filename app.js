const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const routes = require('./routes/index.js');
const morgan = require('morgan');
const fantasyService = require('./service/fantasy/fantasyService.js');
const db = require('./database/dbConnection.js');
const logSettings = require('./log/logConfig.js');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const appEnv = require('./util/env.js');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

/* limit requests to 1000 every 60 minutes per IP */
const limiter = new RateLimit({
 windowMs: 60 * 60 * 1000,
 max: 1000,
 delayMs: 0
});

const logger = logSettings.configure('app.log');

db.connect();

/* close db connection on app termination */
process.on('SIGINT', () => {
 logger.info('App stopped');
 mongoose.connection.close(() => {
  logger.info('Closed database connection');
  process.exit(0);
 });
});

const app = express();
const port = (appEnv.port || '6001');
const host = (appEnv.url || 'http://localhost:' + port);

app.engine('handlebars', handlebars({
 defaultLayout: 'main',
 extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
 extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
/* utilizing for CSRF protection */
app.use(cookieParser());

/* set secure HTTP headers to protect against exploits:
    Script-Transport-Security
    X-Frame-Options
    X-XSS-Protection
    X-Content-Type-Options
    Content-Securiy-Policy
*/
app.use(helmet());

/* protect app api from brute force attacks */
app.use('/fantasy/', limiter);

/* HTTP request logging */
app.use(morgan('combined'));
app.use('/', routes);

/* fantasy data aggregation service */
fantasyService.start();

app.listen(port, () => {
 logger.info(`Running on ${host}`);
});