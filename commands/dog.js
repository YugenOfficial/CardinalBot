const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) =>{
    let msg = await message.channel.send("*Generating . . .*")

        let {body} = await superagent
        .get('https://dog.ceo/api/breeds/image/random')

        if (!{body}) return message.channel.send('I broke. Try again.')

             let dEmbed = new Discord.MessageEmbed()
             .setColor(0x806D00)
             .setImage(body.message)
             .setAuthor('🐶 Woof!')
             .setFooter('Cardinal', bot.user.displayAvatarURL())

             message.channel.send(dEmbed)

             msg.delete();
}

module.exports.config = {
    name: "dog", 
    noallias: "No Aliases",
    aliases: [],
    description: "Sends a random picture of a dog",
    accessableby: "Everyone"
}