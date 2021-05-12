const { MessageAttachment } = require('discord.js');
const config = require("../config.json");

const putt = async (client, url) => {
    let page = await client.page;
    if(config.debug) console.log(url);
    await page.goto(url, { timeout:3000 });
	const screenshoot = await page.screenshot();
    await page.goto("https://www.google.com");
   	return screenshoot;
}

module.exports = {
    name: "print",
    aliases: [],
    help: "Tira Print de qualquer site.",
    run: async (client, msg, args) => {
        let url = args.join(' ');
        if(!url) return msg.reply('envie um url');
        if(!url.startsWith('http')) url = 'https://' + url;   
        const loading = await msg.reply('carregando...');
        putt(client, url)
        .then(async(screenshoot)=>{
            const attachment = new MessageAttachment(screenshoot);
            msg.channel.send(attachment);
            loading.delete();
        })
        .catch((err)=>{
            if(config.debug) console.log(err);
            msg.reply('Pagina Não Encontrada.');
            loading.delete();
        })
    }
};