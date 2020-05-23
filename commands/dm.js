const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    let memberdm = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0])
    let argsresult;
    
    if (message.member.id === "162611515667644416"){
        if(memberdm){
            argsresult = args.slice(1).join(" ")
            if (argsresult){
                try {
                    await memberdm.send(argsresult)
                    message.channel.send('Successfully sent the message.')
                } catch(err) {
                    message.channel.send('Could not send the message. Perhaps the user mentioned disabled DMs?')
                }
            } else {
                message.channel.send("Cannot send an empty message.")
            }
            
        }else{
            message.channel.send('Please mention a valid user.')
        }
    } else {
        message.channel.send('You do not have permission to use this command.')
    }
}
        
module.exports.config = {
    name: "dm", 
    noallias: "No Aliases",
    aliases: [],
    description: "DMs a member of the server",
    accessableby: "Yugen"
}