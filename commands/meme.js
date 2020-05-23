const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args) =>{
    let msg = await message.channel.send("*Generating . . .*");
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                let mEmbed = new Discord.MessageEmbed()
                    .setColor(0xE6E6E6)
                    .setImage(json.url)
                    .setAuthor('🤣 Memes!')
                    .setFooter('Cardinal', bot.user.displayAvatarURL())
                
                message.channel.send(mEmbed)

                msg.delete();
            });
}

module.exports.config = {
    name: "meme", 
    noallias: "No Aliases",
    aliases: [],
    description: "Sends a random meme",
    accessableby: "Everyone"
}