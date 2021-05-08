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
        const res = await page.goto(url)
        return res;
    });
    return putt;
}

module.exports = {
    name: "print",
    aliases: [],
    run: async (client, msg, args) => {
        let url = args.join(' ');
        if(!url) return msg.reply('envie um url');
        if(!url.startsWith('http')) url = 'https://' + url;   
        const loading = await msg.reply('carregando...');
        putt(url)
        .then(async()=>{
            const screenshoot = await page.screenshot();
            const attachment = new MessageAttachment(screenshoot);
            msg.channel.send(attachment);
        })
        .catch((err)=>{
            console.log(err);
            msg.reply('Pagina Não Encontrada.');
        })
        loading.delete();
    }
};