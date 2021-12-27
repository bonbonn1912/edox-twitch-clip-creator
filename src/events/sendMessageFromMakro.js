
const tmi = require('tmi.js');
const opts = require('../Data/connData.js');
require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
});
var client = new tmi.Client(opts);
client.connect();
async function sendMessage(messageType){
    var text = "";
    switch(messageType){
        case "sub": text = "edoxKuss edoxKuss edoxKuss"; break;
        case "hello": text = "edoxHey edoxHey"; break;
        case "heCrazy": text = "heCrazy heCrazy edoxPog"; break;
    }
    
   
    client.say(process.env.CHANEL, text);
    // client.say(process.env.CHANNEL, messageType);
}

module.exports = {
    sendMessage,
}