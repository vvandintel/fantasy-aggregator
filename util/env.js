const cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv();

module.exports = appEnv;