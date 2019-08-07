const log4js = require('log4js');
const errorLogger = log4js.getLogger();
errorLogger.level = 'error';
errorLogger.error("Some error messages");
module.exports = errorLogger;