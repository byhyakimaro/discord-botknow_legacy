const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "ticket",
    aliases: [],
    help: "Cria um ticket no canal.",
    run: async (client, msg, args) => {msg.delete();
        if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000}))
        let emoteFix = await client.emojis.cache.get("755967379363856455");
        let emojiReact = '📩';
        if (msg.channel.id !== config.channel) return msg.reply('set your channel for tickets')
           .then((m) => { m.delete({timeout: 4000}).catch(() => null)} );
        const questions = [
          'Qual o Titulo do ticket?',
           'mensagem do ticket?',
        ];
        const answers = [];
        let counter = 0
        const filter = (m) => { return m.author.id === msg.author.id };
        const collector = new Discord.MessageCollector(msg.channel, filter, {
           max: questions.length,
           time: 20000 * questions.length,
        });
        msg.channel.send(questions[counter++]);
        collector.on('collect', async (m) => {
           if (counter < questions.length) {
             m.channel.send(questions[counter++])
           };
        });
        collector.on('end', async (collected) => {
           if (collected.size < questions.length) return msg.reply('You did not answer the questions in time');
           let counter = 0
           collected.forEach((value) => {
           if(config.debug) console.log(questions[counter++], value.content)
              answers.push(value.content);
           });
           await msg.channel.bulkDelete(4, true).catch(()=>null);
           let embed = await new Discord.MessageEmbed()
              .setColor("#66ff99")
              .setTitle(`${emoteFix} **${answers[0]}**`)
              .setDescription(`${answers[1]}`)
              .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
           await msg.reply(embed).then((m) => {
             m.react(emojiReact);
           });
       });
    }   
};