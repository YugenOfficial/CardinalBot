const Discord = require("discord.js")
const botconfig = require("../botconfig.json")
const fs = require('fs')


module.exports.run = async (bot, message, args) =>{

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to use this command.')
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have permission to use this command.')

    if (!args[0]) return message.channel.send('Please give a number of messages to delete.')

    const amount = parseInt(args[0]) + 1;

    message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('There was an error trying to prune messages in this channel!');
    });
}

module.exports.config = {
    name: "clear", 
    noallias: "No Aliases",
    aliases: [],
    description: "Deletes a number of messages",
    accessableby: "Those with the permission to manage messages."
}