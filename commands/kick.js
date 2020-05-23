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

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('Sorry you do not have permission!')
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I do not have permission to use this command.')

    let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0])
    if(!member) return message.reply("Please mention a valid user");
    if(!member.kickable) return message.channel.send("Sorry I cannot kick that person! Do they have a higher role?");
 
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    member.send(`You have been kicked from ${message.guild.name} for: "${reason}".`)
 
    member.kick(reason)
        .catch(e => message.reply(`Sorry I couldn't kick them! Error: ${e}`));
    message.reply(`:white_check_mark: User kicked!`);
    
    let embed = new Discord.MessageEmbed()
      .setColor(0xFF2525)
      .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
      .addField("Moderation:", "kick")
      .addField("Kicked:", member.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt)

      let sChannel = message.guild.channels.cache.find(c => c.name === mchannel)
      if (sChannel){
          sChannel.send(embed)
        } 
}

module.exports.config = {
    name: "kick", 
    noallias: "No Aliases",
    aliases: [],
    description: "Kicks the user tagged",
    accessableby: "Others who can kick others"
}