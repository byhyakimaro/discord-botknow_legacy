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

    let msgEmbed = await msg.reply(embed);
    msgEmbed.react(emojiReact);
                                       
    client.on('messageReactionAdd', async (reaction, user) => {
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.guild.id !== config.guild) return;
        if (reaction.message.channel.id === config.channel) {
            if (reaction.emoji.name === emojiReact) {
                msg.guild.channels.create(`📌ticket-${user.username}`, {
                  type: 'text',
                  parent: msg.channel.parent,
                  permissionOverwrites: [
                    {
                      id: user.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                    },
                  ],
                }).then(channel => {
                    let emojiClosed = '🔒';
                    let embed1 = new Discord.MessageEmbed()
                    .setColor("#66ff99")
                    .setTitle(`${emoji} Você abriu um ticket, espere um moderador entrar em contato`)
                    .setDescription(`${user} To closed ticket react with ${emojiClosed}`)
                    .setFooter("Sistema de mensagem exclusivo KnowNetwork's")

                    channel.send(embed1).then((m) => {
                        m.react(emojiClosed);
                        client.on('messageReactionAdd', async (reaction, user) => {
                           if (user.bot) return;
                           if (!reaction.message.guild) return;
                           if (reaction.message.guild.id !== config.guild) return;
                           if (reaction.message.channel.id === channel.id) {
                               channel.delete();
                           };
                        });
                    });
                });
                reaction.users.remove(user.id).catch(console.error);
            };
        };
    });
};