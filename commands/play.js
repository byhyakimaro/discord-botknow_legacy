const Discord = require("discord.js");
const ytSearch = require( 'yt-search');
const ytdl = require('ytdl-core');

const playSongs = async (client, msg, found) => {
    const voiceChannel = msg.member.voice.channel;
    if(!voiceChannel) return msg.reply('join voice channel to play music!');
	const connection = await voiceChannel.join();
  	let queue = client.queues.get(msg.member.guild.id);
    if (!queue) {
    	queue = {
        	volume: 100,
            connection: connection,
            dispatcher: null,
            songs: [found],
       };
	}
    queue.dispatcher = await queue.connection.play(
    	await ytdl(found.url, { highWaterMark: 1 << 25, filter: "audioonly", quality: "highestaudio"})
    );
    queue.dispatcher.setVolume(queue.volume/100);
    queue.dispatcher.on('finish', () => {
    	queue.songs.shift();
        if (!queue.songs[0]) {
        	const embedEnd = new Discord.MessageEmbed()
            	.setDescription('Leaving the voice channel because there are no songs in the queue.')
           		.setFooter('Sistema De Mensagens KnowNetworks', msg.author.bot)
           	msg.reply(embedEnd);
            queue.connection.disconnect();
            client.queues.delete(msg.member.guild.id);
       } else {
       		playSongs(client, msg, queue.songs[0]);
       }
    });
	client.queues.set(msg.member.guild.id, queue);
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
};
module.exports = {
    name: "play",
    aliases: ["p"],
    help: "Toca um video do youtube.",
    playSongs,
    run: async (client, msg, args) => {
        let songName = args.join(' ');
        let queue = client.queues.get(msg.member.guild.id);
        if(!songName) return msg.reply('write the name of the song or the url');
        const yt = songName.includes('youtube.com') || songName.includes('youtu.be');
        if(yt) {
            function youtube_parser(url){
                var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                var match = url.match(regExp);
                return (match&&match[7].length==11)? match[7] : false;
            }
            songName = youtube_parser(songName);
        }
        const { videos } = await ytSearch(songName);
        const found = videos[0];
        if(!found) return msg.reply('song not found in youtube!');
        if (queue) {
            queue.songs.push(found);
            client.queues.set(msg.guild.id, queue);
            msg.reply(`Musica ${found.title} adicionada na playlist`);
        } else {
           playSongs(client, msg, found);
        }
    }
};