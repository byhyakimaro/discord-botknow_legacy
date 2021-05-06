const config = require("../config.json");
const { inspect } = require('util');

module.exports = {
    name: "eval",
    aliases: [],
    run: async (client, msg, args) => {
        const command = args.join(' ');
		if(msg.author.id !== config.user_id) return;
        const evaled = async (command) => { return eval(command) };
       	evaled(command)
        	.then((res)=> msg.channel.send(inspect(res), {code: 'js'}))
        	.catch((err)=> msg.channel.send(inspect(err), {code: 'js'}));
    }
};