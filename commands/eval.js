const config = require("../config.json");

module.exports = {
    name: "eval",
    aliases: [],
    run: async (client, msg, args) => {
        const command = args.join(' ');
        if(!command) return;
		if(!msg.author.id === config.user_id) return;
        const evaled = async (command) => { return eval(command) };
       	evaled(command).then((res)=> msg.channel.send(`\`\`\`js\n${res}\`\`\``) ).catch((err)=> msg.channel.send(`\`\`\`js\n${err}\`\`\``) );
    }
};