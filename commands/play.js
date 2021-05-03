const Discord = require("discord.js");
const ytSearch = require( 'yt-search');
const ytdl = require('ytdl-core');

module.exports = {
    name: "play",
    aliases: ["p"],
    run: async (client, msg, args) => {
        const songName = args.join(' ');
        const queue = [];
        if(!songName) return msg.reply('write the name of the song or the url');
        async function searchSong(title) {
            const { videos } = await ytSearch(title);
            const found = videos[0];
            if(!found) return;
            return found;
        };
        const voiceChannel = msg.member.voice.channel;
        if(!voiceChannel) return msg.reply('join voice channel to play music!');
        searchSong(songName).then(async(found) => {
            const song = ytdl(found.url);
            if(!song) return msg.reply('song not found!');
            queue.push(song);
            const connection = await voiceChannel.join();
            const dispatcher = connection.play(song);
            const embedPlaying = new Discord.MessageEmbed()
                .setColor('#2f3136')
            	.setAuthor('Playing Music', 'https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif')
            	.setThumbnail(found.thumbnail)
             	.addFields( 
                    { name: 'Name', value: `Playing ${found.title}`, inline: true }, 
                    { name: 'Duration', value: `${found.timestamp}`, inline: true },
                    { name: 'Request by', value: `${msg.author.tag}`, inline: true },
                )
            if(connection) msg.reply(embedPlaying);
            dispatcher.on('finish', () => {
                queue.splice(song);
                msg.channel.send('Leaving the voice channel because I think there are no songs in the queue.');
                voiceChannel.leave();
            });
        });
    }
};
