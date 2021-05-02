const Discord   = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = async (client, msg) => {msg.delete();
    if(!msg.member.permissions.has("ADMINISTRATOR")) {
    	return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000}))
  	};                 
    const args = msg.content.split(" ");
    var date = new Date();
    var time = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
    let embed = new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **Novo Prefixo Adicionado!**`)
    .setDescription(`\`\`\`O Prefixo do Servidor foi alterado para ${args[1]}\`\`\``)
    .setThumbnail(msg.guild.iconURL())
    .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
    .setTimestamp();

    var sql = "INSERT INTO `prefixs` (guild_id, prefix, data_registro) VALUES ("+msg.guild.id+", '"+args[1]+"', '"+time+"') ON DUPLICATE KEY UPDATE prefix='"+args[1]+"', data_registro='"+time+"';";
    db.mysql.query(sql, async function (err, result) {
    	if (err) return console.log(err);
      	if(config.debug) console.log(`prefixo ${args[1]}`);
    	msg.reply(embed).then(msg => msg.delete({timeout: 5000})).catch(() => null);
    });
};