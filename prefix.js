const Discord   = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = {
    name: "prefix",
    aliases: [],
    help: "Altera o prefixo do bot.",
    run: async (client, msg) => {msg.delete();
        if(!msg.member.permissions.has("ADMINISTRATOR")) { return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000})) };           
        const args = msg.content.split(" ");
        var date = new Date();
        var time = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let emoteFix = await client.emojis.cache.get("755967379363856455");
        let embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .setTitle(`${emoteFix} **Novo Prefixo Adicionado!**`)
        .setDescription(`\`\`\`Prefixo foi alterado para ${args[1]}\`\`\``)
        .setThumbnail(msg.guild.iconURL())
        .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
        .setTimestamp();

        var sql = "INSERT INTO `prefixs` (guild_id, prefix, data_registro) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE prefix=? ,data_registro=?;";
        db.mysql.query(sql,[msg.guild.id, args[1], time, args[1], time] , async function (err, result) {
            if (err) return console.log(err);
            if(config.debug) console.log(`prefixo ${args[1]}`);
            msg.reply(embed);
        });
    }
};