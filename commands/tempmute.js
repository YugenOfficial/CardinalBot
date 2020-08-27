const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const fs = require('fs')
const ms = require('ms')

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
    
    let time = args[1];
    if (!time){
        return message.reply('you did not specify a time!') 
    }

    let reason = args.slice(2).join(" ");
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
            mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}. Your mute will last ${time}.`)
            message.reply(`:white_check_mark: ${mutee.user.username} was successfully muted for ${ms(ms(time))}.`)
        })
    
        let embed = new Discord.MessageEmbed()
        .setColor(0x9A9A9A)
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
        .addField("Moderation:", "tempmute")
        .addField("Mutee:", mutee.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Time:", time)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt)
    
        let sChannel = message.guild.channels.cache.find(c => c.name === mchannel)
        if (sChannel){   
            sChannel.send(embed)
        }

        setTimeout(function(){
            mutee.roles.remove(muterole.id).then(() => {
                let uembed = new Discord.MessageEmbed()
                .setColor(0xd2ffbf)
                .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
                .addField("Moderation:", "unmute")
                .addField("Mutee:", mutee.user.username)
                .addField("Moderator:", "Automatic Unmute")
                .addField("Date:", message.createdAt)

                let uChannel = message.guild.channels.cache.find(c => c.name === mchannel)
                if (uChannel){
                    sChannel.send(uembed)
                }

            })
        }, ms(time));

        
    } else {
        message.channel.send('This user is already muted.')
    }
}

module.exports.config = {
    name: "tempmute", 
    aliases: ['tmute'],
    description: "Mutes the person tagged for a specific time",
    accessableby: "People who can manage roles"
}