const logger = {};
logger.debugLevel = 'warn';
logger.log = function(level, message) {
  var levels = ['error', 'debug'];
  if (levels.indexOf(level) <= levels.indexOf(logger.debugLevel) ) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    };
    console.log(level+': '+message);
  }
}

module.exports = logger;