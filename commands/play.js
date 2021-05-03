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
            return found;
        };
        const voiceChannel = msg.member.voice.channel;
        if(!voiceChannel) return msg.reply('join voice channel to play music!');
        searchSong(songName).then(async(found) => {
            if(!found) return msg.reply('song not found in youtube!');
            const song = ytdl(found.url);
            queue.push(song);
            const connection = await voiceChannel.join();
            const dispatcher = connection.play(song);
            const embedPlaying = new Discord.MessageEmbed()
                .setColor('#2f3136')
            	.setAuthor('Playing Music', 'https://cdn.discordapp.com/emojis/707524750640939009.gif')
            	.setThumbnail(found.image)
             	.addFields( 
                    { name: 'Name', value: found.title, inline: false },
                    { name: 'Duration', value: found.timestamp, inline: true },
                    { name: 'Request by', value: msg.author.tag, inline: true },
                )
            if(connection) msg.reply(embedPlaying);
            dispatcher.on('finish', () => {
                const embedEnd = new Discord.MessageEmbed()
                	.setDescription('Leaving the voice channel because there are no songs in the queue.')
                	.setFooter('Sistema De Mensagens KnowNetworks', msg.author.bot)
                msg.reply(embedEnd);
                queue.splice(song);
                voiceChannel.leave();
            });
        });
    }
};