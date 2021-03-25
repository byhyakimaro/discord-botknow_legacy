module.exports = async (client,msg) =>{
    try{
        const channel  = msg.channel;
        const FetchMsg  = await channel.messages.fetch();
        await channel.bulkDelete(FetchMsg, true);
    } catch(error) {
        msg.channel.send(error)}
}