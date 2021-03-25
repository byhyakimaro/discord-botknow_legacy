const Discord   = require("discord.js");
const config    = require("../config.json");
const commands  = require("../scripts/commandsReader")(config.prefix);

module.exports = async (client,msg) =>{msg.delete();

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
    let emote = await msg.guild.emojis.cache.find(emoji => emoji.name === "right");

    let embed = await new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **disponiveis para uso:**`)
    .setDescription(`
    × 
    ${emote} **${config.prefix}central** \n_\`Comandos para Gerenciar a Central.\`_\n
    ${emote} **${config.prefix}linux** \n_\`Lista de comandos linux\`_\n
    ${emote} **${config.prefix}payloads** \n_\`Payloads Irc-Botnet\`_\n
    ${emote} **${config.prefix}clear** \n_\`Limpar Todo o Chat\`_\n
    ${emote} **${config.prefix}ping** \n_\`Informaçoes de Latencia do Bot.\`_\n
    ${emote} **${config.prefix}backup** \n_\`Faz Um Backup da Central.\`_\n
    ${emote} **${config.prefix}ban @membro**\n_\`Ban permanente liberando apenas por id no servidor!\`_\n
`)
    .setThumbnail("https://media.discordapp.net/attachments/749020899658825758/787367956001980456/b8a3cd1fad69ee87b4a843ca7769f49a.gif?width=745&height=559")
    .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
    .setTimestamp();

    msg.reply(embed);
};