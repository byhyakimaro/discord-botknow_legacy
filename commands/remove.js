const Discord   = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = {
    name: "remove",
    aliases: ["rm"],
    help: "remove a musica da playlist.",
    run: async (client, msg) => {
        const song = Number(msg.content.split(" ")[1]);
        if (!song) return msg.reply('selecione o numero da musica na playlist.');
        const voiceChannel = msg.member.voice.channel;
        const queue = client.queues.get(msg.guild.id);
        if (!voiceChannel) return msg.reply(`You must be in a voice channel to use this command.`).then((m)=>{ m.delete({timeout: 4000}).catch(() => null) });
        if (!queue) return msg.reply(`no songs in currently playing in this guild.`);
        if (queue.songs.length > song || queue.songs.length < song ) return msg.reply('selecione uma musica da playlist.');
        queue.songs.splice(song-1);
        msg.react('✅');
    }
};