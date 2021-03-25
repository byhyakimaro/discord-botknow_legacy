const Discord   = require("discord.js");
const config    = require("../config.json");
const commands  = require("../scripts/commandsReader")(config.prefix);

module.exports = async (client,msg) => {msg.delete();

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
    let emote = await msg.guild.emojis.cache.find(emoji => emoji.name === "right");

    let embed = await new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **comados central:**`)
    .setDescription(`
    × 
    ${emote} **${config.prefix}central_add_user** \n \`adicionar um novo usuario.\`\n
    ${emote} **${config.prefix}central_remove_user** \n \`deleta um usuario.\`\n
    `)
    .setThumbnail("https://cdn.discordapp.com/attachments/749020899658825758/749032698030456852/background.gif")
    .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
    .setTimestamp();

    msg.reply(embed).then(msg => msg.delete({timeout: 15000}));
};