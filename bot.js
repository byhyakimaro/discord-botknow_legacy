const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const commands = require("./scripts/commandsReader")(config.prefix);
const unknowCommand = require("./scripts/unknowCommand");
const db = require('./database/db');

db.mysql.connect(function(err) {
  if (err) throw err;
  console.log("Connected Database!");
});

client.on("ready",()=>{
    console.log(`Whitelisted ${client.user.tag}`);
    client.user.setActivity(`Hacked You!`);
});

client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]) commands[args[0]](client,msg);
        else if(args[0].split("")[0] == config.prefix) unknowCommand(client,msg);
    }
});

client.on("guildMemberAdd", async (member) => { 

    let guild = await client.guilds.cache.get(config.guild);
    let channel = await client.channels.cache.get(config.channel);
    let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "phone");
    if (guild != member.guild) {
      return console.log("Acess Denied.");
     } else {
        let embed = await new Discord.MessageEmbed()
        .setColor("#000000")
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`${emoji} Novo Membro.`)
        //.setImage("https://cdn.discordapp.com/attachments/749020899658825758/749032698030456852/background.gif")
        .setDescription(`${member.user} ***Entrou no servidor Deseja Mesmo ele aqui?***\ \n||@everyone||`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setFooter("Sistema de mensagem exclusivo Black's Hats")
        .setTimestamp();
  
      channel.send(embed);
    }
  })

client.login(config.token);