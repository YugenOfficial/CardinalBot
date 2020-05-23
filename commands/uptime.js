const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = `📅 ${days} days, ${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds`;
    let sEmbed = new Discord.MessageEmbed()
        .setColor("#66FF78")
        .setDescription(uptime)
    message.channel.send(sEmbed)
}
        
module.exports.config = {
    name: "uptime", 
    aliases: ['ut'],
    description: "Displays how long the bot has been online for",
    accessableby: "Everyone"
}