const Discord   = require("discord.js");
const config    = require("../config.json");
const commands  = require("../scripts/commandsReader")(config.prefix);

module.exports = async (client,msg) =>{msg.delete();

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
    let emojiReact = '📩';
    let embed = await new Discord.MessageEmbed()
    .setColor("#66ff99")
    .setTitle(`${emoji} **Support**`)
    .setDescription(`To create a ticket react with ${emojiReact}`)
    .setFooter("Sistema de mensagem exclusivo KnowNetwork's")

    if (msg.channel.id === config.channel) {
        let msgEmbed = await msg.reply(embed);
    	msgEmbed.react(emojiReact);
    };
};