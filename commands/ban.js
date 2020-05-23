const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const fs = require('fs')

module.exports.run = async (bot, message, args) =>{

    let mchannels = JSON.parse(fs.readFileSync('./mchannels.json', "utf8"));

    if (!mchannels[message.guild.id]){
        mchannels[message.guild.id] = {
               mchannels: botconfig.mchannel
    }
    }

    let mchannel = mchannels[message.guild.id].mchannels;

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Sorry you do not have permission!')
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have permission to use this command.')

    let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0])
    if(!member) return message.reply("please mention a valid user");
    if(!member.bannable) return message.channel.send("Sorry I cannot ban that person! Do they have a higher role?");
 
    let breason = args.slice(1).join(' ');
    if(!breason) breason = "No reason provided"

    member.send(`You have been banned from ${message.guild.name} for: ${breason}.`)

    member.ban({reason: breason})
    message.reply(`:white_check_mark: User banned!`)
    
    let embed = new Discord.MessageEmbed()
      .setColor(0xB20000)
      .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
      .addField("Moderation:", "ban")
      .addField("Banned:", member.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", breason)
      .addField("Date:", message.createdAt)

      let sChannel = message.guild.channels.cache.find(c => c.name === mchannel)
      if (sChannel){sChannel.send(embed)}
}
        
module.exports.config = {
    name: "ban", 
    noallias: "No Aliases",
    aliases: [],
    description: "Bans the person tagged",
    accessableby: "People who can ban others."
}