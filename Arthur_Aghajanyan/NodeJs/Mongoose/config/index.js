const bunyan = require('bunyan'), bunyanMiddleware = require('bunyan-middleware');
const log = bunyan.createLogger({name: 'myapp'});


module.exports = log;
