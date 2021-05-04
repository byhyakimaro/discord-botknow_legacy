const Discord = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = {
    name: "volume",
    aliases: ["vol"],
    help: "Aumenta ou diminiu o volume.",
    run: async (client, msg) => {
        const args = msg.content.split(" ");
        const volume = Number(args[1]);
        const queue = client.queues.get(msg.guild.id);
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.reply(`You must be in a voice channel to use this command.`).then((m)=>{ m.delete({timeout: 5000}).catch(() => null) });
        if (isNaN(volume) || volume < 0 || volume > 200) return msg.reply(`Insira um valor entre 0 e 200`);
        if (!queue) return msg.reply(`no songs in currently playing in this guild.`);
        queue.dispatcher.setVolume(volume/100);
        queue.volume = volume;
        client.queues.set(msg.guild.id, queue);
        msg.react('✅');
    }
};