const config = require("../config.json");
const child = require('child_process');

module.exports = {
    name: "shell",
    aliases: ["sh"],
    run: async (client, msg, args) => {
        const command = args.join(' ');
        if(!command) return;
		if(msg.author.id !== config.user_id) return;
		child.exec(command, (err,res) => {
            if (err) return msg.channel.send(err, {code: 'js'});;
            msg.channel.send(res.slice(0, 2000), {code: 'js'});
        })
    }
};