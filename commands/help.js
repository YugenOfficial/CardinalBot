const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>{
    let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', "utf8"));

    if (!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
               prefixes: botconfig.prefix
    }
    }

    let prefix = prefixes[message.guild.id].prefixes;

    if (args[0] == "help") return message.channel.send(`Just do "${prefix}help" instead.`)

    if (args[0]){
        let command = args[0];
        if(bot.commands.has(command)){
            command = bot.commands.get(command);
            var SHembed = new Discord.MessageEmbed()
            .setColor(0x32F825)
            .setAuthor('Cardinal Help List', message.guild.iconURL())
            .setDescription(`Cardinal's prefix is: **${prefix}**\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noallias || command.config.aliases}`)
            message.channel.send(SHembed)
        } else {
            message.channel.send(`"${args[0]}" is not a valid command.`)
        }
    }
        if (!args[0]){
            let sembed = new Discord.MessageEmbed()
            .setColor(0x32F825)
            .setAuthor("Cardinal's Available Commands", message.guild.iconURL())
            .setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp()
            .setDescription(`These are the available commands for Cardinal.\n Cardinal's prefix is **${prefix}**.\nFor information about a specific command, do "${prefix}help <command>" instead.`)
            .addField(`Commands:`, "➖Basic: dog, cat, meme, 8ball, coinflip, ,rps, pp, heightcalc\n➖Informative: info, userinfo, serverinfo, ping, uptime\n➖Moderation: kick, ban, unban, mute, tempmute, unmute, clear, say, announce")
            .setFooter("Cardinal", bot.user.displayAvatarURL())
            message.channel.send(sembed)
        }
}

module.exports.config = {
    name: "help", 
    aliases: ["h"],
    description: "",
    accessableby: "Everyone"
}