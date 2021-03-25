const Discord   = require("discord.js");
const config    = require("../config.json");
const commands  = require("../scripts/commandsReader")(config.prefix);

module.exports = async (client,msg,channel,member) =>{msg.delete();

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "developer");
    let emote = await msg.guild.emojis.cache.find(emoji => emoji.name === "right");

    let embed = await new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **Linux:**`)
    .setDescription(`
    × 
    ${emote} **Comandos Basico** \n https://raw.githubusercontent.com/Paulo0819/commands/main/cmds_basics.md\n
    ${emote} **All Tools** \n https://raw.githubusercontent.com/Paulo0819/commands/main/Tools.md\n
    ${emote} **Wordlist** \n https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt\n
`)
    .setThumbnail("https://cdn.discordapp.com/attachments/749020899658825758/749032698030456852/background.gif")
    .setFooter("Sistema de mensagem exclusivo Black's Hats")
    .setTimestamp();

    msg.channel.send(embed).then(msg => msg.delete({timeout: 15000}))
}