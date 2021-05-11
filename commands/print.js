const puppeteer = require('puppeteer');
const { MessageAttachment } = require('discord.js');
const config = require("../config.json");

const putt = async (url) => {
   const putt = puppeteer.launch({
    headless: true,
    args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox"
    ]
    }).then(async (chrome) => {
        let browser = chrome;
        let page = await browser.newPage();

        await page.setViewport({
            width: 1366,
            height: 768
        });
        await page.goto(url, { timeout:3000 });
        const screenshoot = await page.screenshot();
        return screenshoot;
    });
    return putt;
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
        putt(url)
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