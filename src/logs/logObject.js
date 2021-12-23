var bunyan = require('bunyan');
const path = require("path");

const logger = bunyan.createLogger({
    name: "twitch-clip-creator",
    streams: [
     {
        level : "info",
        path: path.resolve(__dirname, "./cliplogs.json")
      }, 
    ],
  });

  const whisperlogger = bunyan.createLogger({
    name: "twitch-clip-creator",
    streams: [
     {
        level : "info",
        path: path.resolve(__dirname, "./whisperlogs.json")
      }, 
    ],
  });

function createLogEntryForClip(message, username, result) {
    logger.info(message.url + " " + username + " " + result);
}

function createLogEntryForWhisper(message) {
    whisperlogger.info(message);
}

module.exports = {
    createLogEntryForWhisper,
    createLogEntryForClip,
    logger,
}

