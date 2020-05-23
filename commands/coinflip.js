const Discord = require("discord.js")
const botconfig = require("../botconfig.json")


module.exports.run = async (bot, message, args) =>{

    const flip = 0.1;
    const result = (Math.random() * flip);

    const reply = (result < 0.05 ? "Heads" : "Tails");

    if (reply == "Heads"){
        let sEmbed = new Discord.MessageEmbed()
        .setTitle('**Heads**')
        .setColor(0x4DD0E1)
        .setImage("https://imgur.com/Ga1UI2H.png")
        message.channel.send(sEmbed);
    }
    
    if (reply == "Tails"){
        let sEmbed = new Discord.MessageEmbed()
        .setTitle('**Tails**')
        .setColor(0x4DD0E1)
        .setImage("https://imgur.com/lNFD5kg.png")
        message.channel.send(sEmbed);
    }
}

module.exports.config = {
    name: "coinflip", 
    aliases: ['cf'],
    description: "Displays either Heads or Tails",
    accessableby: "Everyone"
}