const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    if (!args[0]) return message.channel.send("You need to choose between `rock`, `paper`, or `scissors`.")

    let replies = ['rock', 'paper', 'scissors'];
    let result = Math.floor((Math.random() * replies.length));

    let uReply = args[0];
    if (!replies.includes(uReply)) return message.channel.send("Only these responses are accepted: `rock`,`paper`,`scissors`");

    if ((uReply === "rock" && replies[result] === "scissors") ||
        (uReply === "paper" && replies[result] === "rock") ||
        (uReply === "scissors" && replies[result] === "paper")) {
            let sEmbed = new Discord.MessageEmbed()
            .setTitle(`Rock-Paper-Scissors - ${message.author.username} vs ${bot.user.username}`)
            .setDescription(`**${uReply}** vs **${replies[result]}**\nYou have won!`)
            .setThumbnail("https://imgur.com/cUazPIZ.png")
            .setColor(0xFEED25)
            message.channel.send(sEmbed);
        } else if (uReply === replies[result]){
            let sEmbed = new Discord.MessageEmbed()
            .setTitle(`Rock-Paper-Scissors - ${message.author.username} vs ${bot.user.username}`)
            .setDescription(`**${uReply}** vs **${replies[result]}**\nIt's a tie!`)
            .setThumbnail("https://imgur.com/sV2Qn4N.png")
            .setColor(0xFEAC25)
            message.channel.send(sEmbed);
        } else {
            let sEmbed = new Discord.MessageEmbed()
            .setTitle(`Rock-Paper-Scissors - ${message.author.username} vs ${bot.user.username}`)
            .setDescription(`**${uReply}** vs **${replies[result]}**\nYou lost!`)
            .setThumbnail('https://imgur.com/YTDiRNq.png')
            .setColor(0xFF1C1C)
            message.channel.send(sEmbed);
        }
}
        
module.exports.config = {
    name: "rps", 
    noallias: "No Aliases",
    aliases: [],
    description: "Rock-Paper-Scissors game",
    accessableby: "Everyone"
}