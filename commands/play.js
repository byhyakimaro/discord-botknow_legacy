const Discord   = require("discord.js");
const db = require('../scripts/db');
const config = require("../config.json");
const ytSearch = require( 'yt-search');
const ytdl = require('ytdl-core');

module.exports = async (client, msg, args) => {
    const songName = args.join(' ');
    if(!songName) return msg.reply('seu sapinho :D');
    async function searchSong(title) {
        const { videos } = await ytSearch(title);
        const found = videos[0];
        if(!found) return;
        return ytdl(found.url);
    };
    const voiceChannel = msg.member.voice.channel;
    if(!voiceChannel) return msg.reply('seu sapo');
    searchSong(songName).then(async(song) => {
        if(!song) return msg.reply('seu sapo');
        const connection = await voiceChannel.join();
        const dispatcher = connection.play(song);
        dispatcher.on('finish', () => {
            msg.reply('cabou');
            voiceChannel.leave();
        });
    });
};