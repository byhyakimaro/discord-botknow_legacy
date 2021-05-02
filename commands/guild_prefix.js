const Discord = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = async (client, msg) => {msg.delete();
    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000}));
    if (msg.guild.id !== config.guild) return;                                     
    const args = msg.content.split(" ");
                                         
    db.mysql.query("SELECT guild_id,prefix FROM prefixs WHERE guild_id= ?", [parseFloat(args[1])], async function (err, result) {
    	if (err) return console.log(err);
        if (result == "") return msg.reply('Servidor não encontrado.')
            .then((m) => { m.delete({timeout: 4000}).catch(() => null)} );
        const prefix = JSON.parse(JSON.stringify(result[0].prefix));
        let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
        let embed = new Discord.MessageEmbed()
          .setColor("#000000")
          .setTitle(`${emoji} **Prefixo ${msg.guild.name}!**`)
          .setDescription(`\`\`\`o prefixo de ${msg.guild.name} é ${prefix}\`\`\``)
          .setThumbnail(msg.guild.iconURL())
          .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
          .setTimestamp();
        msg.reply(embed);
    });
};                                       