const Discord = require("discord.js")
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) =>{

    let sEmbed = new Discord.MessageEmbed()
        .setColor("#7244fc")
        .setTitle("Cardinal's Invite Link")
        .setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(`https://discord.com/oauth2/authorize?client_id=712962304374866001&permissions=2147483639&scope=bot`)
        message.channel.send(sEmbed)

}

module.exports.config = {
    name: "invite", 
    noallias: "No Aliases",
    aliases: [],
    description: "Gives the invite link for the bot, making you able to invite it to your server",
    accessableby: "Everyone"
}