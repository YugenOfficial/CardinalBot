const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const fs = require('fs')

module.exports.run = async (bot, message, args) =>{

    if (!message.member.hasPermission('MANAGE_SERVER')) return message.reply('you do not have permission to use this command.')
    if (!args[0]) return message.channel.send(`Usage: <current-prefix>prefix <new prefix>`)

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json"), "utf8")

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) =>{
        if (err) console.log(err)
    });

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#FF9000")
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`)

    message.channel.send(sEmbed);

}

module.exports.config = {
    name: "prefix", 
    noallias: "No Aliases",
    aliases: [],
    description: "Changes the bot's prefix",
    accessableby: "Those with the permission to manage the server."
}