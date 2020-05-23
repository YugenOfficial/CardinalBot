const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
    

    if (!args[1]) return message.reply('please ask a full question.')
    let replies = ["Yes.","No.","Perhaps.","Not sure.",'I am about done with this shit.', 'As I see it, yes.', 'Better not tell you now.','Cannot predict that.',"Don't count on it.", "It is certain.","My reply is no.","Very doubtful.","Without a doubt."]

    let result = Math.floor((Math.random() * replies.length))
    let question = args.slice(0).join(" ")

    let ballembed = new Discord.MessageEmbed()
    .setTitle('__8 Ball__')
    .setThumbnail('https://magic-8ball.com/assets/images/magicBallStart.png')
    .setColor('#007BE1')
    .addField("Question", question)
    .addField("Answer", replies[result])

    message.channel.send(ballembed)
}
        
module.exports.config = {
    name: "8ball", 
    aliases: ['8b'],
    description: "Responds with an answer",
    accessableby: "Everyone"
}