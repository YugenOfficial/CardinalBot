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

    if (!args[0]) return message.reply("please provide the ID of a valid user.")

    let bannedMember;
    try{                                                            
        bannedMember = await bot.users.fetch(args[0])
    }catch(e){
        if(!bannedMember) return message.channel.send("That's not a valid ID.")
    }

    try {
        await message.guild.fetchBan(args[0])
    } catch(e){
        message.channel.send('This user is not banned.');
        return;
    }
    
    let breason = args.slice(1).join(' ');
    if(!breason) breason = "No reason provided"

    try {
        message.guild.members.unban(bannedMember, {reason: breason})
        message.reply(`:white_check_mark: User unbanned!`)
    
        let embed = new Discord.MessageEmbed()
          .setColor(0x17FF33)
          .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
          .addField("Moderation:", "unban")
          .addField("Unbanned:", `${bannedMember.username}`)
          .addField("Moderator:", message.author.username)
          .addField("Reason:", breason)
          .addField("Date:", message.createdAt)

          let sChannel = message.guild.channels.cache.find(c => c.name === mchannel)
          if (sChannel){sChannel.send(embed)}
        
    } catch(e) {
        console.log(e.message)
    }
}
        
module.exports.config = {
    name: "unban", 
    noallias: "No Aliases",
    aliases: [],
    description: "Unbans the person tagged",
    accessableby: "People who can ban others."
}