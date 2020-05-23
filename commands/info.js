const Discord = require("discord.js")
const botconfig = require("../botconfig.json")


module.exports.run = async (bot, message, args) =>{

    let uEmbed = new Discord.MessageEmbed()
        .setTitle("**🖥️ Cardinal's Information**")
        .addField('User:', bot.user.username, true)
        .addField('Discriminator:', bot.user.discriminator , true)
        .addField('ID:', bot.user.id , true)
        .addField('Full Username', bot.user.tag, true)
        .addField('Created On:', bot.user.createdAt, true)
        .setColor(0xd62bb1)
        .setDescription("Created By: **Yugen#1494** & **Grace#1503**")
        .setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(uEmbed);
}

module.exports.config = {
    name: "info", 
    noallias: "No Aliases",
    aliases: [],
    description: "Shows information about the bot",
    accessableby: "Everyone"
}