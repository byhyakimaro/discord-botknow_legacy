const Discord = require("discord.js");
const db = require('../scripts/db');

module.exports = {
    name: "list",
    aliases: [],
    run: async (client, msg, args) => {msg.delete();
        const result =  await db.query("SELECT guild_id,prefix FROM prefixs WHERE guild_id= ?", [msg.guild.id]);
        const prefix = JSON.parse(JSON.stringify(result[0].prefix));
        const commands = require("../scripts/commandsReader")(prefix);
        let emoteFix = await client.emojis.cache.get("755967379363856455");
        let emoteRight = await client.emojis.cache.get("755969436644671509");
        let string = "";
        commands.forEach((command) => {
        	if (command.help) { string += `\n${emoteRight} **${prefix}${command.name}** \n_\`${command.help}\`_\n` };
        });   
        let embed = await new Discord.MessageEmbed()
            .setColor("#000000")
            .setTitle(`${emoteFix} **disponiveis para uso:**`)
            .setDescription(`
            ×  ${string}
            `)
            .setThumbnail("https://media.discordapp.net/attachments/749020899658825758/787367956001980456/b8a3cd1fad69ee87b4a843ca7769f49a.gif?width=745&height=559")
            .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
            .setTimestamp();
        msg.reply(embed);
   }
};