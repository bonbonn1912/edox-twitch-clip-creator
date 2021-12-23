require("dotenv").config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`
});


module.exports= opts = {
    identity: {
      username: process.env.CLIENT_ID,
      password: process.env.TOKEN,
    },
    channels: [
     process.env.CHANEL,
    ]
  };

  