const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
  if (!args[1]){
    message.channel.send("You need to write something to vote on.");
    return;
  }

  let msgargs = args.slice(1).join(" ");

  let uEmbed = new Discord.MessageEmbed()
        .setTitle("Time to vote! 📊")
        .setDescription(msgargs)
        .setColor(0xd62bb1)

  let msgEmbed = await message.channel.send(uEmbed);
  await msgEmbed.react("👍")
  await msgEmbed.react("👎")
  message.delete 

  
                 
}
        
module.exports.config = {
    name: "vote", 
    noallias: "No Aliases",
    aliases: [],
    description: "Makes a yes/no vote",
    accessableby: "Everyone"
}