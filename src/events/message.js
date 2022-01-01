require("dotenv").config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`
});


//import checkForCommandFunction
var check = require("../checks/checkForCommand.js");
var api = require("../Data/createClip.js");
var time = require("../Data/time.js");




//import Logging 
var bunyan = require("../logs/logObject.js");

//handle Message from MessageHandler
async function handleMessage(target, context, msg, client) {
  if (check.ForClipCommand(msg)) {
    if (!check.ForCooldown()) {
      check.ResetCooldown();
      client.say(
        target,
        "Trying to create a clip, please wait a few seconds"
      );
      try {
        await api.createClip(context.username, time.getTime()).then((data) => {
          whisperClip(target, client, data);
          client.say( target,"Twitch clip created by " + context.username + " at " + time.getTime());
          bunyan.createLogEntryForClip(data, context.username, "CLIP ERSTELLT");
        }).catch((error) => {
          console.log("error: " + error);
          client.say(
            target,
            "Twitch clip could not be created, please try again later"
          );
        });
       
      } catch (e) {
        bunyan.createLogEntryForClip(e, context.username, "CLIPPEN FEHLGESCHLAGEN");
      }
    } else {
      client.say(
        target,
        "!clip command can only be used once every 120 seconds"
      );
    }
  }
}

//whisper clip to streamer
function whisperClip(target, client, clip) {
  var message = "Clip erstellt von :" + clip.createdBy + " am :" + clip.createdOn +" Url:" +clip.url;
  bunyan.createLogEntryForWhisper("WHISPER GESENDET, INHALT: " +message);
  client.whisper(
   process.env.WHISPER_TO,
    message 
  );
}

module.exports = {
  handleMessage,
};
