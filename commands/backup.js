const Discord   = require("discord.js");

module.exports = async (client,msg,channel,member) =>{msg.delete();
  if(!msg.member.permissions.has("ADMINISTRATOR")) {
    return msg.member.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000}))
  }

  let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "verified");
  let embed = await new Discord.MessageEmbed()
  .setColor("#000000")
  .setTitle(`${emoji} **BackUp**`)
  .setDescription(`Restricted Access.`)
  .attachFiles(['./uploads/Central.rar'])
  .setThumbnail("https://cdn.discordapp.com/attachments/749020899658825758/756407411593576568/wp2345370.jpg")
  .setFooter("Sistema de mensagem exclusivo KnowNetwork's")
  .setTimestamp();

  msg.member.send(embed).then(msg => msg.delete({timeout: 25000}))
}