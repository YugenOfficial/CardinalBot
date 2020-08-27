const Discord = require("discord.js")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{

    if(!args[1]){
        return message.reply('in order for me to calculate your height, you will need to tell me your height in centimeters. Correct usage: `scheightcalc <height>`')
    }

    if (isNaN(args[1])){
        return message.reply('your height needs to be a number.')
    }

    if(args[1]>271 || args[1]<50){
        return message.reply('stop bullshitting me.')
    }

    if(args[1] == 272){
        return message.reply('you are as tall as the tallest man who ever lived! Or you are just lying, which is probably the case.')
    }

    message.reply(`your height is ${args[0]}cm!`)
    
}
        
module.exports.config = {
    name: "heightcalculator", 
    aliases: ['heightcalc'],
    description: "Calculates the user's height",
    accessableby: "Everyone"
}