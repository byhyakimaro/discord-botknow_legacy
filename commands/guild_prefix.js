const Discord = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = {
    name: "guild_prefix",
    aliases: [],
    run: async (client, msg) => {msg.delete();
        if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 4000}));
        if (msg.member.id !== config.user_id) return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 4000}));
        const args = msg.content.split(" ");
		if (!args[1]) return msg.reply('Escreva o id do servidor');
        await db.query("SELECT guild_id,prefix FROM prefixs WHERE guild_id= ?", [Number(args[1])]);
        if (result == "") return msg.reply('Servidor não encontrado.')
        	.then((m) => { m.delete({timeout: 4000}).catch(() => null)} );
        const prefix = JSON.parse(JSON.stringify(result[0].prefix));
        let emoteFix = await client.emojis.cache.get("755967379363856455");
        let embed = new Discord.MessageEmbed()
        	.setColor("#000000")
			.setTitle(`${emoteFix} **Prefixo ${client.guilds.cache.get(args[1]).name}!**`)
            .setDescription(`\`\`\`o prefixo de ${client.guilds.cache.get(args[1]).name} é ${prefix}\`\`\``)
            .setThumbnail(client.guilds.cache.get(args[1]).iconURL())
            .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
            .setTimestamp();
          msg.reply(embed);
    }
};                                       