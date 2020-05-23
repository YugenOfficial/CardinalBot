const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
    let sEmbed = new Discord.MessageEmbed()
         .setTitle('**Server Information**')
         .addField('Server Name:', message.guild.name, true)
         .addField('Server Owner:', message.guild.owner, true)
         .addField('Member Count:', message.guild.memberCount, true)
         .addField('Server Region:', message.guild.region, true)
         .addField('Created On:', message.guild.createdAt, true)
         .setColor(0x00D8FF)
        .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
         message.channel.send(sEmbed);
}

module.exports.config = {
    name: "serverinfo", 
    aliases: ["si"],
    usage: `scserverinfo`,
    description: "Sends information about the server",
    accessableby: "Everyone"
}