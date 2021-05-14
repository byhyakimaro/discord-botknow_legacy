const mysql = require("mysql2/promise");
const config = require("../config.json");

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    
    const connection = await mysql.createConnection(`mysql://${config.user}:${config.password}@${config.host}:3306/${config.database}`);
    console.log("Connected Database!");
    global.connection = connection;
    return connection;
}

async function query(sql, values){
    const conn = await connect();
    const [rows] = await conn.query(sql ,values);
    return rows;
}

module.exports = {query}