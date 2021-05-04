const Discord   = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = {
    name: "stop",
    aliases: [],
    help: "para a musica do bot.",
    run: async (client, msg, args) => {
        const voiceChannel = msg.member.voice.channel;
        const queue = client.queues.get(msg.guild.id);
        if (!voiceChannel) return msg.reply(`You must be in a voice channel to use this command.`).then((m)=>{ m.delete({timeout: 4000}).catch(() => null) });
        if (!queue) return msg.reply(`no songs in currently playing in this guild.`);
        voiceChannel.leave();
        client.queues.delete(msg.member.guild.id);
        msg.react('🛑');
    }
};