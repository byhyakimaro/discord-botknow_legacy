const Discord   = require("discord.js");
const db = require('../database/db');

module.exports = async (client, msg) => {msg.delete();

    const args = msg.content.split(" ");
    const png = 'https://pastebin.com/themes/pastebin/img/guest.png';
    var date = new Date();
    var time = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
    let emote = await msg.guild.emojis.cache.find(emoji => emoji.name === "right");
    let embed = new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **Novo Usuario Adicionado!**`)
    .setDescription(`
    ${emote} **Usuario ${args[1]} Cadastrado.**
    `)
    .setThumbnail(png)
    .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
    .setTimestamp();

    var sql = "INSERT INTO `usuario` VALUES (null,sha2('"+args[1]+"',256),sha2('"+args[2]+"',256),'"+args[3]+"','"+png+"','"+time+"')";
    db.mysql.query(sql, async function (err, result) {
      if (err) throw err;
      msg.reply(embed).then(msg => msg.delete({timeout: 5000}));
    });
};