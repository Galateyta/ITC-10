function formatConsoleDate(date) {
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();

  return '[' + ((hour < 10)
    ? '0' + hour
    : hour) + ':' + ((minutes < 10)
    ? '0' + minutes
    : minutes) + ':' + ((seconds < 10)
    ? '0' + seconds
    : seconds) + '.' + ('00' + milliseconds).slice(-3) + '] ';
}

const logger = {};
logger.debugLevel = process.env.LOG_LEVEL;
logger.log = function (level, message) {
  var levels = ['error', 'debug'];
  if (levels.indexOf(level) <= levels.indexOf(logger.debugLevel)) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    };
    console.log(`${formatConsoleDate(new Date())}: ${level} : ${message}`);
  }
}

module.exports = logger;