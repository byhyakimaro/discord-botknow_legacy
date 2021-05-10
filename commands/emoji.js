module.exports = {
    name: "emoji",
    aliases: [],
    help: "pega o url do emoji",
    run: async (client, msg) => {
      const args = msg.content.split(" ")[1]
      	.replace(/<?a?:(\w+?):(\d+)?>?/g, '$1');
      const emoji = client.emojis.cache.find(emoji => emoji.name === args);
	  const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}?v=1`;
      msg.reply(url);
    }
};