
require("dotenv").config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`
});

var axios = require("axios");


const twitchEndpoint = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    timeout: 1000,
    headers: {Authorization: "Bearer " + process.env.TOKEN,"Client-id": process.env.CLIENT_ID,}
  })
module.exports = {
   twitchEndpoint: twitchEndpoint,
}