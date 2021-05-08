const puppeteer = require('puppeteer');
const { MessageAttachment } = require('discord.js');
const config = require("../config.json");

let browser, page;

puppeteer.launch({
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
});

module.exports = {
    name: "print",
    aliases: [],
    run: async (client, msg, args) => {
        let url = args.join(' ');    
        if(!url) return msg.reply('envie um url');
        if(!url.startsWith('http')) url = 'https://' + url;   
        const loading = await msg.reply('carregando...');
      
        await page.goto(url)
        .then(async()=>{
            const screenshoot = await page.screenshot();
            const attachment = new MessageAttachment(screenshoot);
            msg.channel.send(attachment);
        })
        .catch((err)=>{
            console.log(err);
            msg.channel.send('Pagina Não Encontrada.');
        })
        loading.delete();
    }
};