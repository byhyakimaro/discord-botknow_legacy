const Discord   = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");

module.exports = {
    name: "queue",
    aliases: ["qu"],
    help: "lista todas as musicas da playlist.",
    run: async (client, msg, args) => {
        let songs = '';
        const voiceChannel = msg.member.voice.channel;
        const queue = client.queues.get(msg.guild.id);
        if (!voiceChannel) return msg.reply(`You must be in a voice channel to use this command.`).then((m)=>{ m.delete({timeout: 4000}).catch(() => null) });
        if (!queue || !queue.songs[0]) return msg.reply(`no songs in currently playing in this guild.`);
        for (let i=0; i < queue.songs.length; i++) {
          const song = queue.songs[i];
          songs += `\n**${i+1}) ${song.title}** \`(${song.timestamp})\``;
        };
        const embed = new Discord.MessageEmbed()
        	.setColor('#faed70')
        	.setTitle('Musics queue.')
        	.setDescription(`\n${songs}`)
        	.setFooter('By KnowNetworks')
        msg.reply(embed);
    }
};