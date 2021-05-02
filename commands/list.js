const Discord = require("discord.js");
const db = require('../scripts/db');

module.exports = async (client,msg) =>{msg.delete();
  db.mysql.query("SELECT guild_id,prefix FROM prefixs WHERE guild_id= ?", [msg.guild.id], async function (err, result) {
    if (err) return console.log(err);
    const prefix = JSON.parse(JSON.stringify(result[0].prefix));
        
    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
    let emote = await msg.guild.emojis.cache.find(emoji => emoji.name === "right");

    let embed = await new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **disponiveis para uso:**`)
    .setDescription(`
    × 
    ${emote} **${prefix}prefix <prefixo>** \n_\`Altera o prefixo do bot.\`_\n
    ${emote} **${prefix}ticket** \n_\`Cria um ticket\`_\n
    ${emote} **${prefix}clear** \n_\`Limpar Todo o Chat\`_\n
    ${emote} **${prefix}ping** \n_\`Informaçoes de Latencia do Bot.\`_\n
    ${emote} **${prefix}ban @membro**\n_\`Ban permanente liberando apenas por id no servidor!\`_\n
    `)
    .setThumbnail("https://media.discordapp.net/attachments/749020899658825758/787367956001980456/b8a3cd1fad69ee87b4a843ca7769f49a.gif?width=745&height=559")
    .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
    .setTimestamp();

    msg.reply(embed);
  });
};