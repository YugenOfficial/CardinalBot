const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry you do not have permission!')
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have permission to use this command!')

    let argsresult;
    let mChannel = message.mentions.channels.first()
    if(mChannel){
        argsresult = args.slice(1).join(" ")
        if (argsresult){
            mChannel.send(argsresult)
        } else {
            message.channel.send("Cannot send an empty message.")
        }
        
    }else{
        argsresult = args.join(" ")
        if (argsresult){
            message.channel.send(argsresult)
        } else {
            message.channel.send("Cannot send an empty message.")
        }
    }
}
        
module.exports.config = {
    name: "say", 
    noallias: "No Aliases",
    aliases: [],
    description: "Says what was said in the original message",
    accessableby: "People who can manage messages."
}