module.exports = {
    name: "remove",
    aliases: ["rm"],
    help: "remove a musica da playlist.",
    run: async (client, msg, args) => {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.reply(`You must be in a voice channel to use this command.`).then((m)=>{ m.delete({timeout: 4000}).catch(() => null) });
        if (!args) return msg.reply('escreva o titulo ou a posisão.');
        const queue = client.queues.get(msg.guild.id);
        if (!queue) return msg.reply(`no songs in currently playing in this guild.`);
        if (isNaN(args)) {
           for (let i=0; i < queue.songs.length; i++) {
           		const song = queue.songs[i].title.includes(args);
               	if (song) {
                    if(i===0) return msg.reply('musica tocando pule a musica para mudar.')
                    queue.songs.splice(i,1);
                    break;
                }
                if (queue.songs.length-1 === i) return msg.reply('Not Found.');
           }
        } else {
           const song = Number(args);
           if (song > queue.songs.length || song < 1) return msg.reply('track position or title.');
           if (song == 1) return msg.reply('musica tocando pule a musica para mudar.')
           queue.songs.splice(song-1,1);
        }
        msg.react('✅');
    }
};