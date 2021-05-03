const fs = require("fs");
const dir = "./commands/";

module.exports = (prefix) =>{
    var commands = [];

    const scripts = fs.readdirSync(dir);
    scripts.forEach(script=>{
        commands.push(require("../"+dir+script));
    });
    return commands;
}