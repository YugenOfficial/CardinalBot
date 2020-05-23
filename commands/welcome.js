const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const fs = require('fs')

module.exports.run = async (bot, message, args) =>{

    if (!message.member.hasPermission('MANAGE_SERVER')) return message.reply('you do not have permission to use this command.')    
    if (!args[0]) return message.channel.send(`Please input the name of a valid channel to become the welcome channel. Do not mention the channel. Simply write it's name.`)

    let Channelw = args[0]
    let wchannels = JSON.parse(fs.readFileSync("./wchannels.json"), "utf8")

    wchannels[message.guild.id] = {
        wchannels: Channelw
    };

    fs.writeFile("./wchannels.json", JSON.stringify(wchannels), (err) =>{
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#FF9000")
    .setTitle("Welcoming Channel Set!")
    .setDescription(`Set to "${Channelw}"`)

    message.channel.send(sEmbed);

}

module.exports.config = {
    name: "welcome", 
    noallias: "No Aliases",
    aliases: [],
    description: "Changes the welcoming channel.",
    accessableby: "Those with the permission to manage the server."
}