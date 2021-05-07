const puppeteer = require('puppeteer');
const { MessageAttachment } = require('discord.js');
const config = require("../config.json");

let browser, page;

async function webScrapping(url) {
    const ppet = puppeteer.launch({
        headless: true,
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    }).then(async (chrome) => {
        browser = chrome;
        page = await browser.newPage();
      
        await page.setViewport({
            width: 1366,
            height: 768
        });

        await page.goto(url);
        const screenshoot = await page.screenshot();

        await browser.close();
        return screenshoot;
    });
    return ppet;
};

module.exports = {
    name: "print",
    aliases: [],
    run: async (client, msg, args) => {
 		let url = args.join(' ');
      
        if(!url) return msg.reply('envie um url');
        if(!url.startsWith('http')) url = 'https://' + url;
      
        const loading = await msg.reply('carregando...');
        console.log(await webScrapping(url));
        /*.then((m)=> {
            const attachment = new MessageAttachment(m);
            msg.channel.send(attachment);
        })
        .catch(()=> { return msg.reply('Pagina não encontrada.') });
        loading.delete();*/
    }
};