const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    message.channel.send("*Pinging . . .*").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        
        let sEmbed = new Discord.MessageEmbed()
        .setColor("#45FF3C")
        .setDescription(`⌛ Bot Latency: ${ping}ms\n⏱️ API Latency: ${Math.round(bot.ws.ping)}ms`)

        m.delete()
        message.channel.send(sEmbed)
    })
}
        
module.exports.config = {
    name: "ping", 
    noallias: "No Aliases",
    aliases: [],
    description: "Displays the API and bot latency",
    accessableby: "Everyone"
}