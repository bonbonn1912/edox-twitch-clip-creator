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

  const banlogger = bunyan.createLogger({
    name: "spam ban",
    streams: [
     {
        level : "info",
        path: path.resolve(__dirname, "./banlogs.json")
      }, 
    ],
  });

function createLogEntryForClip(message, username, result) {
    logger.info(message.url + " " + username + " " + result);
}

function createLogEntryForWhisper(message) {
    whisperlogger.info(message);
}

function createLogEntryForBan(username) {
    banlogger.info(username);
}

module.exports = {
    createLogEntryForWhisper,
    createLogEntryForClip,
    createLogEntryForBan,
    logger,
}

