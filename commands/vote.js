const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
  if (!args[1]){
    message.channel.send("You need to write something to vote on.");
    return;
  }

  let msgargs = args.slice(1).join(" ");

  let uEmbed = new Discord.MessageEmbed()
        .setTitle("📊" + msgargs)
        .setColor(0xd62bb1)
        message.channel.send(uEmbed).then(messageReaction => {
          await messageReaction.react("👍")
          await messageReaction.react("👎")
          message.delete.catch(console.error);
        })

  
                 
}
        
module.exports.config = {
    name: "vote", 
    noallias: "No Aliases",
    aliases: [],
    description: "Makes a yes/no vote",
    accessableby: "Everyone"
}