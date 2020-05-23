const Discord = require("discord.js")
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) =>{

    let sizes = ['8D',
    '8=D',
    '8==D',
    '8===D',
    '8====D',  
    '8=====D',
    '8======D', 
    '8=======D',
    '8========D',
    '8=========D',
    '8==========D',
    '8===========D',
    '8============D',
    '8=============D',
    '8==============D',
    '8===============D',
    '8================D']

    let size = Math.floor((Math.random() * sizes.length));

    if (message.member.id === "162611515667644416"){
        let sEmbed = new Discord.MessageEmbed()
        .setColor("#8138ff")
        .setTitle("PP Size")
        .setDescription(`Yugen's pp is too big to fit in a single Discord message.`)
        message.channel.send(sEmbed)

    } else {
        let sEmbed = new Discord.MessageEmbed()
        .setColor("#4fffe8")
        .setTitle("PP Size")
        .setDescription(`${message.author.username}'s pp size:\n${sizes[size]}`)
        message.channel.send(sEmbed)
    }
}

module.exports.config = {
    name: "pp", 
    noallias: "No Aliases",
    aliases: [],
    description: "Shows someone's pp size",
    accessableby: "Everyone"
}