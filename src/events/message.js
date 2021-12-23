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
        "twitch clip will be created. Cooldown is 120 Seconds"
      );
      //  whisperClip(target, client, api.createClipObject(context.username, time.getTime()));
      try {
        var clip = await api.createClip(context.username, time.getTime());
        whisperClip(target, client, clip);
        bunyan.createLogEntryForClip(clip, context.username, "CLIP ERSTELLT");
      } catch (e) {
        console.log("Error: " + e);
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
  bunyan.createLogEntryForWhisper(message);
  client.whisper(
    "bonbot_",
    message
  );
}

module.exports = {
  handleMessage,
};
