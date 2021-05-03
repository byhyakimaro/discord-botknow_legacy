const Discord = require("discord.js")

module.exports = {
    name: "ban",
    aliases: [],
    run: async (client, msg, args) => {
      msg.delete()
      if(!msg.member.permissions.has("BAN_MEMBERS")) {
        return msg.reply("Você não tem a permissão necessária!")
      }

      if(!msg.guild.me.permissions.has("BAN_MEMBERS")) {
        return msg.reply("Eu não tenho a permissão necessária!")
      }

      let membro = msg.mentions.members.first()
      if(!membro) return msg.reply("Você precisa mencionar alguem!")
      if(membro.user.id === msg.author.id) {
        return msg.reply("Você não pode se banir!")
      }
      if(membro.user.id === client.user.id) {
        return msg.reply("Por que você quer me banir?")
      }
      if(membro.permissions.has("ADMINISTRATOR")) {
        return msg.reply("Eu não tenho dignidade para bani-lo!")
      }
      membro.ban();

      let emoteVerified = await client.emojis.cache.get("755967479959912448");
      let embed = await new Discord.MessageEmbed()
          .setColor("#000000")
          .setTitle(`${emoteVerified} **${membro} Banido**`)
          .setAuthor(membro.user.tag, membro.user.displayAvatarURL())
          .setDescription(`_\`este e um servidor privado por tanto seu acesso foi bloqueado.\`_`)
          .setThumbnail(membro.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
          .setFooter("Sistema de mensagem exclusivo KnowNetworks")
          .setTimestamp();
      msg.channel.send(embed).then(msg => msg.delete({timeout: 5000}).catch(() => null));
    }
}