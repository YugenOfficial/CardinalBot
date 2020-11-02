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

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to use this command.")
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to use this command.")

    if(!args[0]) return message.reply("please tag the user you wish to be unmuted.")
    let unmutee = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0])
    if (!unmutee) return message.reply("please tag the user you wish to be unmuted.")
    if (unmutee.id === '712962304374866001') return message.reply("I am not muted.")
    

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
    if (!muterole) return message.channel.send("There is no mute role to remove.")

    if (unmutee.roles.cache.has(muterole.id)){

      unmutee.roles.remove(muterole.id).then(() => {
          unmutee.send(`You have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
          message.reply(`:white_check_mark: ${unmutee.user.username} has been unmuted!`)
      })

      let embed = new Discord.MessageEmbed()
      .setColor(0xd2ffbf)
      .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
      .addField("Moderation:", "unmute")
      .addField("Former Mutee:", unmutee.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt)

      let sChannel = message.guild.channels.cache.find(c => c.name === mchannel)
      if (sChannel){sChannel.send(embed)}
    }else{ return message.reply('the user you have mentioned is not muted.')}
}
        
module.exports.config = {
    name: "unmute", 
    noallias: "No Aliases",
    aliases: [],
    description: "Unmutes the person tagged",
    accessableby: "People who can manage roles"
}