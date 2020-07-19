const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const superagent = require("superagent");
const fetch = require('node-fetch');

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log('This bot is online!');
    });

    let lol = ['Youtube📺', 'the world burn🔥', 'the stars☄️', 'apples rot🍎', 'nature documentaries🌲', 'yoga lessons🧘🏻','anime🖥️','you👀'];
    bot.on("ready", () => {
    setInterval(function() {
  
    let status = lol[Math.floor(Math.random()*lol.length)];
    bot.user.setActivity(status, {type: "WATCHING"})
  
    }, 900000)}
)

bot.on("guildMemberAdd", async member =>{

    let wchannels = JSON.parse(fs.readFileSync('./wchannels.json', "utf8"));

    if (!wchannels[member.guild.id]){
        wchannels[member.guild.id] = {
               wchannels: botconfig.wchannel
    }
    }

    let wchannel = wchannels[member.guild.id].wchannels;
    const channel = member.guild.channels.cache.find(channel => channel.name === wchannel);
    if (!channel) return;

    let overview = member.guild.channels.cache.find(channel => channel.id === "727880587859329046");
    let reactrole = member.guild.channels.cache.find(channel => channel.id === "583749407179014144");
    let intro = member.guild.channels.cache.find(channel => channel.id === "598244799648235530");

    if (member.guild.id == "583679863802822657"){
        let uEmbed = new Discord.MessageEmbed()
        .setTitle('**Welcome!**')
        .setDescription(`Welcome to the server, ${member.user}! Be sure to read the rules here: ${overview}, get yourself some roles here: ${reactrole} and introduce yourself here: ${intro} 🎉🥳`)
        .setColor(0x1efae8)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        channel.send(uEmbed)
    } else {
        let uEmbed = new Discord.MessageEmbed()
        .setTitle('**Welcome!**')
        .setDescription(`Welcome to the server, ${member.user}! Be sure to read the rules! 🎉🥳`)
        .setColor(0x1efae8)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        channel.send(uEmbed)
    }

    
})

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/",(err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        return console.log("Couldn't find commands!");
    }

    jsfile.forEach((f, i) =>{
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias =>{
            bot.aliases.set(alias, pull.config.name)
        })
    })
})

bot.on("message", async message =>{
    if (message.author.bot || message.channel.type === "dm") return;
    
    let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', "utf8"));

    if (!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
               prefixes: botconfig.prefix
    }
    }

    let prefix = prefixes[message.guild.id].prefixes;

    let mchannels = JSON.parse(fs.readFileSync('./mchannels.json', "utf8"));

    if (!mchannels[message.guild.id]){
        mchannels[message.guild.id] = {
               mchannels: botconfig.mchannel
    }
    }

    let mchannel = mchannels[message.guild.id].mchannel;

    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
})

bot.login(process.env.token);