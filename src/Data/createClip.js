require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
});

var reqData = require("./endpoints.js");
const clipEndpoint = 'clips?broadcaster_id=' + process.env.BROADCASTER_ID;


async function createClip(createdBy, createdOn){
  //  console.log(  `${__dirname}/.env.${process.env.NODE_ENV}`);
   // console.log(clipEndpoint);
    return new Promise((resolve, reject) => {
        reqData.twitchEndpoint.post(clipEndpoint)
        .then(function(response){
            resolve({createdBy: createdBy,
            createdOn: createdOn,
            url: "https://clips.twitch.tv/"+response.data.data[0].id,
        });
        })
        .catch(function(error){
          // console.log("ALARM" +error.response.data.status);
          resolve(error.response.data.status);
        })
    })
    
}

module.exports = {
    createClip,
}