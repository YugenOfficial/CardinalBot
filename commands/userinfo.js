const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0])
    if (!member){
        let uEmbed = new Discord.MessageEmbed()
        .setTitle('**User Information**')
        .addField('User:', message.author.username, true)
        .addField('Discriminator:', message.author.discriminator , true)
        .addField('ID:', message.author.id , true)
        .addField('Full Username', message.author.tag, true)
        .addField('Created On:', message.author.createdAt, true)
        .setColor(0x0592FF)
        .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(uEmbed);
    }else{

        let uEmbed = new Discord.MessageEmbed()
        .setTitle('**User Information**')
        .addField('User:', member.user.username, true)
        .addField('Discriminator:', member.user.discriminator , true)
        .addField('ID:', member.user.id , true)
        .addField('Full Username', member.user.tag, true)
        .addField('Created On:', member.user.createdAt, true)
        .setColor(0x0592FF)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(uEmbed);
    }
}

module.exports.config = {
    name: "userinfo", 
    aliases: ["ui"],
    description: "Sends information about the user",
    accessableby: "Members"
}