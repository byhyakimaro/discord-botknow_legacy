const Discord   = require("discord.js");
const config    = require("../config.json");
const commands  = require("../scripts/commandsReader")(config.prefix);

module.exports = async (client,msg) =>{msg.delete();
    var message = msg.content.split(" ");
    message = message[0];

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "loading");
    let embed = await new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **Comando nao encontrado**`)
    .setDescription(`\`Comando '${message}' não existe\`\n \`Digite '${config.prefix}list' para obter a lista de comandos \` `)

  msg.channel.send(embed).then(msg => msg.delete({timeout: 3000}))
}