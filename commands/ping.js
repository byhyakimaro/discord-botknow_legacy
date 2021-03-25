module.exports = async (client, msg, args) => {msg.delete({timeout: 4000});
    const m = await msg.channel.send('ping?')
  
    m.edit(`🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp -
        msg.createdTimestamp}ms.**\nLatência da API: **${Math.round(
        client.ws.ping
      )}ms**`
    );
    m.delete({timeout: 4000});
  };