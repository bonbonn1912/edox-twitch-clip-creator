const tmi = require('tmi.js');
require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
});

console.log(process.env.NODE_ENV);
console.log(process.env.CLIENT_ID);
console.log(process.env.WHISPER_TO);
console.log(process.env.BROADCASTER_ID);
console.log(process.env.NODE_ENV);
//import server
const server = require('./src/server/server.js');

// import connection properties from data.js
const opts = require('./src/Data/connData.js');

//import eventHandler from events/message.js
const event = require('./src/events/message.js');

//create new tmi Client
const client = new tmi.Client(opts);

//connect client to chat
client.connect();

//listen for messages
 client.on('connected',onConnectionHandler);
   client.on('message', onMessageHandler);

// on connection handler
function onConnectionHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}


function onMessageHandler (target, context, msg, self){
   if(self){return};
   event.handleMessage(target, context, msg, client);
}


