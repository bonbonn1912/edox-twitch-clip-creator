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
  var account = context.username;
  if(account.includes("bonbonn")){
    try{
      client.say(target, "/bann "+account);
    }catch(e) {
      console.log("Error: "+e);
    }
  }
  console.log(account.includes('Sein')); 
  if (check.ForClipCommand(msg)) {
    if (!check.ForCooldown()) {
      check.ResetCooldown();
      client.say(
        target,
        "Clip wird erstellt [Bot]"
      );
      try {
        await api.createClip(context.username, time.getTime()).then((data) => {
         // whisperClip(target, client, data);
          client.say( target,"Clip erstellt von: " + context.username + " um " + time.getTime() +" (Kann nachträglich länger oder kürzer geschnitten werden)");
          client.say(target, data.url);
          bunyan.createLogEntryForClip(data, context.username, "CLIP ERSTELLT");
        }).catch((error) => {
          console.log("error: " + error);
          client.say(
            target,
            "Twitch clip konnte nicht erstellt werden [Bot]"
          );
        });
       
      } catch (e) {
        bunyan.createLogEntryForClip(e, context.username, "CLIPPEN FEHLGESCHLAGEN");
      }
    } else {
      client.say(
        target,
        "!clip Command hat 120 Sekunden Cooldown [Bot]"
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
