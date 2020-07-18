const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const fs = require('fs')

module.exports.run = async (bot, message, args) =>{

    let mchannels = JSON.parse(fs.readFileSync('./mchannels.json', "utf8"));

    if (!mchannels[message.guild.id]){
        mchannels[message.guild.id] = {
               mchannels: botconfig.mchannel
    }
    }

    let mchannel = mchannels[message.guild.id].mchannels;

    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You do not have permission to use this command.")
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have permission to use this command")

    if(!args[0]) return message.reply("please tag the user you wish to be muted.")
    let mutee = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0])
    if (!mutee) return message.reply("please tag the user you wish to be muted.")
    if (mutee.id === message.author.id) return message.reply('You can not mute yourself.')
    if (mutee.id === '712962304374866001') return message.reply("I will not mute myself. Nice try.")
    

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
    if (!muterole){
        try{
            muterole = await message.guild.roles.create({
                data:{
                name: "Muted",
                color: "#C9C9C9",
                permissions: []
                }
            })
            message.guild.channels.cache.forEach(async (channel, id) =>{
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
            })
        } catch(e){
            console.log(e.stack);
        }
    }

    if (!mutee.roles.cache.has(muterole.id)){

        mutee.roles.add(muterole.id).then(() => {
            message.delete()
            mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`)
            message.reply(`:white_check_mark: ${mutee.user.username} was successfully muted.`)
        })
    
        let embed = new Discord.MessageEmbed()
        .setColor(0x9A9A9A)
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
        .addField("Moderation:", "mute")
        .addField("Mutee:", mutee.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt)
    
        let sChannel = message.guild.channels.cache.find(c => c.name === mchannel)
        if (sChannel){   
            sChannel.send(embed)}
    } else {
        message.channel.say('This user is already muted.')
    }
}

module.exports.config = {
    name: "mute", 
    noallias: "No Aliases",
    aliases: [],
    description: "Mutes the person tagged",
    accessableby: "People who can manage roles"
}