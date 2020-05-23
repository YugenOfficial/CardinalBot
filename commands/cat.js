const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) =>{
    let msg = await message.channel.send("*Generating . . .*")

        let {body} = await superagent
        .get('http://aws.random.cat/meow')

        if (!{body}) return message.channel.send('I broke. Try again.')

             let cEmbed = new Discord.MessageEmbed()
             .setColor(0xFFE226)
             .setImage(body.file)
             .setAuthor('🐱 Meow~')
             .setFooter('Cardinal', bot.user.displayAvatarURL())

             message.channel.send(cEmbed)

             msg.delete();
}

module.exports.config = {
    name: "cat", 
    noallias: "No Aliases",
    aliases: [],
    description: "Sends a random picture of a cat",
    accessableby: "Everyone"
}