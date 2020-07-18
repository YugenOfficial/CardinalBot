const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry you do not have permission!')
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have permission to use this command!')

    let split = "|";

    if (!args[0]){
        return message.channel.send("Cannot send an empty embed. Correct usage: `scannounce <Title> | <Announcement>`")
    }

    args = args.join(' ').split(split);
    for (var i=0; i<args.length; i++) args[i]=args[i].trim();

    let uEmbed = new Discord.MessageEmbed()
        .setTitle(args[0])
        .setDescription(args[1])
        .setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor(0xd62bb1)
        message.channel.send(uEmbed);
}

        
module.exports.config = {
    name: "announce", 
    noallias: "No Aliases",
    aliases: [],
    description: "Says what was said in the original message, but in an embed",
    accessableby: "People who can manage messages."
}