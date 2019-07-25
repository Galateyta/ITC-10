const mongoose = require("mongoose");
const logger = require("../app");

const mongo = require("../mongo.config");
const config = 'mongodb://' + mongo.ip + ":" + mongo.mPort + '/' + mongo.collection;
mongoose.connect(config, {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);
module.exports = mongoose;