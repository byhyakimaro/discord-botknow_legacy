const skipSong = require("./play").playSongs;

module.exports = {
    name: "skip",
    aliases: ["s"],
    help: "Pula para a proxima musica.",
    run: async (client, msg, args) => {
        const voiceChannel = msg.member.voice.channel;
        const queue = client.queues.get(msg.guild.id);
        if (!voiceChannel) return msg.reply(`You must be in a voice channel to use this command.`).then((m)=>{ m.delete({timeout: 4000}).catch(() => null) });
        if (!queue) return msg.reply(`no songs in currently playing in this guild.`);
		queue.songs.shift();
  		client.queues.set(msg.guild.id, queue);
  		skipSong(client, msg, queue.songs[0]);
        msg.react('⏭');
    }
};