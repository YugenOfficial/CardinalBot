const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const fs = require('fs')

module.exports.run = async (bot, message, args) =>{

    if (!message.member.hasPermission('MANAGE_SERVER')) return message.reply('you do not have permission to use this command.')    
    if (!args[0]) return message.channel.send(`Please input the name of a valid channel to become the modlog channel. Do not mention the channel. Simply write it's name.`)

    let Channelm = args[0]
    let mchannels = JSON.parse(fs.readFileSync("./mchannels.json"), "utf8")

    mchannels[message.guild.id] = {
        mchannels: Channelm
    };

    fs.writeFile("./mchannels.json", JSON.stringify(mchannels), (err) =>{
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#FF9000")
    .setTitle("ModLogs Channel Set!")
    .setDescription(`Set to "${Channelm}"`)

    message.channel.send(sEmbed);

}

module.exports.config = {
    name: "modlog", 
    noallias: "No Aliases",
    aliases: [],
    description: "Changes the modlogs channel.",
    accessableby: "Those with the permission to manage the server."
}