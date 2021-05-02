const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const db = require('./scripts/db');

db.mysql.connect(function(err) {
  if (err) throw err;
  console.log("Connected Database!");
  //create database
  var sql = "CREATE TABLE IF NOT EXISTS `prefixs` ( `guild_id` varchar(32) NOT NULL, `prefix` varchar(32) DEFAULT NULL, `data_registro` datetime DEFAULT NULL, PRIMARY KEY (`guild_id`));";
  db.mysql.query(sql, async function (err, result) {
    if (err) return console.log(err);
  });
});

client.on("ready",()=>{
    console.log(`Whitelisted ${client.user.tag}`);
    client.user.setActivity(`Hacked You!`);
});

client.on("message", async (msg)=>{
    //create prefix if not exist
    var sql = "INSERT INTO `prefixs` (guild_id, prefix, data_registro) VALUES (? , ?, null) ON DUPLICATE KEY UPDATE guild_id=?;";
    db.mysql.query(sql, [msg.guild.id, config.prefix, msg.guild.id], async function (err, result) { if (err) return console.log(err) });
    //select prefix
    db.mysql.query("SELECT guild_id,prefix FROM prefixs WHERE guild_id= ?", [msg.guild.id], async function (err, result) {
    	if (err) return console.log(err);
        const prefix = JSON.parse(JSON.stringify(result[0].prefix));
        const commands = require("./scripts/commandsReader")(prefix);
		const unknowCommand = require("./scripts/unknowCommand");
        //check mensage
        if(!msg.author.bot && msg.guild){
          if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
          const args = msg.content.split(" ");
          if(commands[args[0]]) commands[args[0]](client,msg);
          else if(args[0].split("")[0] == prefix) unknowCommand(client,msg);
    	}
    });
});

const tickets = {};
client.on('messageReactionAdd', async (reaction, user) => {
    const emoji = await reaction.message.guild.emojis.cache.find(emoji => emoji.name === "fix");
    const chTicket = tickets[user.id];
    let emojiReact = '📩';
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id !== config.channel) return;
       if (reaction.emoji.name === emojiReact) {
       if (chTicket) return reaction.message.reply(`You already have a ticket open.`)
          .then((m) => {reaction.users.remove(user.id); m.delete({timeout: 4000}).catch(() => null)});
       await reaction.message.guild.channels.create(`📌ticket-${user.username}`, {
          type: 'text',
          parent: reaction.message.channel.parent,
          permissionOverwrites: [
            {
              id: user.id,
               allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
            },
          ],
          }).then(async channel => {
             tickets[user.id] = channel
             let emojiClosed = '🔒';
             let embed1 = await new Discord.MessageEmbed()
             .setColor("#66ff99")
             .setTitle(`${emoji} Você abriu um ticket, espere um moderador entrar em contato`)
             .setDescription(`${user} To closed ticket react with ${emojiClosed}`)
             .setFooter("Sistema de mensagem exclusivo KnowNetwork's")

             await channel.send(embed1).then((m) => {
               m.react(emojiClosed);
               client.on('messageReactionAdd', async (reaction, user) => {
               if (user.bot) return;
               if (!reaction.message.guild) return;
               if (reaction.message.channel.id === channel.id) {
                  await channel.delete();
                  delete tickets[user.id];
				};
	     	});
	 	});
     });
    await reaction.users.remove(user.id).catch(console.error);
    };
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