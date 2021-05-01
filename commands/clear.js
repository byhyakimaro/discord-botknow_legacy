module.exports = async (client,msg) =>{
    if(!msg.member.permissions.has("ADMINISTRATOR")) {
    	return msg.channel.send("**Acess Denied. :lock:**").then(msg => msg.delete({timeout: 5000}))
  	}
    try{
        const channel  = msg.channel;
        const FetchMsg  = await channel.messages.fetch();
        await channel.bulkDelete(FetchMsg, true);
    } catch(error) {
        msg.channel.send(error)}
}