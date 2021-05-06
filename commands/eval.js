const config = require("../config.json");
const { inspect } = require('util');

module.exports = {
    name: "eval",
    aliases: [],
    run: async (client, msg, args) => {
        const command = args.join(' ')
            .replace(/^`{3}(js)?|`{3}$/g, '')
            .replace(/<@!?(\d{16,18})>/g, '_user($1)');
        const _user = (id) => client.users.cache.find((user) => user.id == id);
		if(msg.author.id !== config.user_id) return;
        const evaled = async (command) => { return eval(command) };
       	evaled(command)
        	.then((res)=> msg.channel.send(inspect(res), {code: 'js'}))
        	.catch((err)=> msg.channel.send(inspect(err), {code: 'js'}));
    }
};