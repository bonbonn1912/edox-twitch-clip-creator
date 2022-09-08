require("dotenv").config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`
});


//import checkForCommandFunction
var check = require("../checks/checkForCommand.js");
var api = require("../Data/createClip.js");
var time = require("../Data/time.js");
var reqData = require("../Data/endpoints")




//import Logging 
var bunyan = require("../logs/logObject.js");

//handle Message from MessageHandler
async function handleMessage(target, context, msg, client) {

  checkForSpam(target, context, msg, client);
  checkForForbiddenWords(target, context, msg, client);

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

async function checkForSpam(target, context, msg, client){

  if(!context.subscriber){
    var lowerCaseMessage = msg.toLowerCase();
    if(lowerCaseMessage.includes('buy') && lowerCaseMessage.includes('follower') || lowerCaseMessage.includes('followers')){
      let userid = await getUserID(context.username);
      banUser(userid);
   //    client.say(target, "/ban " + context.username);
   // client.say(target, "L8r @" + context.username + " [Bot]");
      bunyan.createLogEntryForBan(context.username + " was banned");
    }
  }
}
 
// 76126553
// 76044242

async function getUserID(username){
  let useridEndpoint = `users?login=${username}`
  let response = await reqData.twitchEndpoint.get(useridEndpoint);
  let userid = response.data.data[0].id;
  return userid;
}

async function banUser(userid){
  let streamerId = process.env.BANTARGET;
  let banEndpoint = `moderation/bans?broadcaster_id=${streamerId}&moderator_id=76126553`
  reqData.twitchEndpoint.post(banEndpoint, {
    data: {
      "user_id": `${userid}`,
      "reason": "spam"
    }
  })
}

function checkForForbiddenWords(target, context, msg, client){
  if(target != 'acquaviva_' && target != 'montekuchen'){
    var lowerCaseMessage = msg.toLowerCase();
    if(lowerCaseMessage.includes('krawatte') || lowerCaseMessage.includes(' bwo') || lowerCaseMessage.includes('kravatte') || lowerCaseMessage.includes(':necktie:')|| lowerCaseMessage.includes('👔') || lowerCaseMessage.includes('vitavate')|| lowerCaseMessage.includes('eliasn1')){
    //  client.say(target, "/timeout " + context.username+ " 600");
    //  client.say(target, "Stille Treppe Großer @" + context.username);
      bunyan.createLogEntryForBan(context.username + " timeout due to eliasn97");
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
