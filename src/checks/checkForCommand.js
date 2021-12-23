require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
});


const cooldown = process.env.COOLDOWN;
var isCooldown = false;

function ForClipCommand(message){
    if(message.includes("!clip")){
        return true;
    }
}

function ResetCooldown(){
    console.log("Cooldown started");
    isCooldown = true;
        setTimeout(() => {
        isCooldown = false;
        console.log("Cooldown is over");
    },cooldown)
}

function ForCooldown(){
    return isCooldown;
}


module.exports = {
    ForClipCommand,
    ResetCooldown,
    ForCooldown,
    isCooldown,
    cooldown,
};