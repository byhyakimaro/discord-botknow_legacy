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

//joined a server
client.on("guildCreate", guild => {
    var sql = "INSERT INTO `prefixs` VALUES ( ?, ?, null);";
    db.mysql.query(sql, [guild.id, config.prefix], async function (err, result) { if (err) return console.log(err) });
    if(config.debug) console.log(`Joined a new guild: ${guild.name}`);
});

//removed from a server
client.on("guildDelete", guild => {
    var sql = "DELETE FROM `prefixs` WHERE guild_id = ?;";
    db.mysql.query(sql, [guild.id], async function (err, result) { if (err) return console.log(err) });
    if(config.debug) console.log(`Left a guild: ${guild.name}`);
})

client.on("message", async (msg)=>{
    //select prefix
    db.mysql.query("SELECT guild_id,prefix FROM prefixs WHERE guild_id= ?", [msg.guild.id], async function (err, result) {
    	if (err) return console.log(err);
        const prefix = JSON.parse(JSON.stringify(result[0].prefix));
        const commands = require("./scripts/commandsReader")(prefix);
		const unknowCommand = require("./scripts/unknowCommand");
        //check mensage
        if(!msg.author.bot && msg.guild){
          if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
          const args = msg.content.slice(prefix.length).split(/ +/g);
    	  const cmd = args.shift().toLowerCase();
          if(commands[prefix+cmd]) commands[prefix+cmd](client,msg,args);
          else if(msg.content.startsWith(prefix)) unknowCommand(client,msg);
    	}
    });
});

const tickets = {};
client.on('messageReactionAdd', async (reaction, user) => {
    let emoteFix = await client.emojis.cache.get("755967379363856455");
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
             .setTitle(`${emoteFix} Você abriu um ticket, espere um moderador entrar em contato`)
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
    let emotePhone = await client.emojis.cache.get("755967511706468452");
    let embed = await new Discord.MessageEmbed()
      .setColor("#000000")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emotePhone} Novo Membro.`)
      //.setImage("https://cdn.discordapp.com/attachments/749020899658825758/749032698030456852/background.gif")
      .setDescription(`${member.user} ***Entrou no servidor!***`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Sistema de mensagem exclusivo Black's Hats")
      .setTimestamp();
    member.guild.systemChannel.send(embed);
});

client.login(config.token);