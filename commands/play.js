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
            queue.push(song);
            if(!song) return msg.reply('song not found!');
            const connection = await voiceChannel.join();
            const dispatcher = connection.play(song);
            const embed = new Discord.MessageEmbed()
            	.setAuthor('Playing Music')
            	.setColor('#36393F')
            	.setThumbnail(found.thumbnail)
             	.addFields( { name: 'Name', value: `Playing ${found.title}` } )
            if(connection) msg.reply(embed);
            dispatcher.on('finish', () => {
                queue.splice(song);
                msg.channel.send('Leaving the voice channel because I think there are no songs in the queue.');
                voiceChannel.leave();
            });
        });
    }
};