const ytSearch = require( 'yt-search');
const ytdl = require('ytdl-core');

module.exports = {
    name: "play",
    aliases: ["p"],
    run: async (client, msg, args) => {
        const songName = args.join(' ');
        const queue = [];
        if(!songName) return msg.reply('Escreva');
        async function searchSong(title) {
            const { videos } = await ytSearch(title);
            const found = videos[0];
            if(!found) return;
            return ytdl(found.url);
        };
        const voiceChannel = msg.member.voice.channel;
        if(!voiceChannel) return msg.reply('seu sapo');
        searchSong(songName).then(async(song) => {
            queue.push(song);
            if(!song) return msg.reply('seu sapo');
            const connection = await voiceChannel.join();
            const dispatcher = connection.play(song);
            dispatcher.on('finish', () => {
                queue.splice(song);
                msg.reply('cabou');
                voiceChannel.leave();
            });
        });
    }
};