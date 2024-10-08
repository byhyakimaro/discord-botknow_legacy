module.exports = {
    name: "clear",
    aliases: [],
    help: "Limpar Todo o Chat.",
    run: async (client, msg, args) => {msg.delete();
        if(!msg.member.permissions.has("MANAGE_MESSAGES")) {
            return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000}).catch(() => null))
        }
        try{
            const channel = msg.channel;
            const FetchMsg = await channel.messages.fetch();
            await channel.bulkDelete(FetchMsg, true);
        } catch(error) {
            msg.channel.send(error)
        };
    }
};