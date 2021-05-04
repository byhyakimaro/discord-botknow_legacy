const Discord   = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = {
    name: "stop",
    aliases: ["s"],
    help: "para a musica do bot.",
    run: async (client, msg, args) => {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.reply(`You must be in a voice channel to use this command.`).then((m)=>{ m.delete({timeout: 4000}).catch(() => null) });
        voiceChannel.leave();
        client.queues.delete(msg.member.guild.id);
        msg.react('🛑');
    }
};
