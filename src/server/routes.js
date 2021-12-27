var express = require('express');
var send = require("../events/sendMessageFromMakro.js");
var routes = express.Router();

routes.get("/", (req, res)=>{ 
    res.send("wrong endpoint")
  })

routes.get("/sendMessage/:idMessage", (req, res) => {
    send.sendMessage(req.params.idMessage);
    res.send("Message sent");
})



module.exports = routes;