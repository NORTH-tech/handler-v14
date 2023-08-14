//module-loading
const { Client, GatewayIntentBits } = require("discord.js")
const { readdirSync } = require('fs');
require('dotenv').config();

//create-client
const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger)
});

//client-event-loading
const events = readdirSync(`./events`).filter(files => files.endsWith('.js'));
for (const file of events) {
    const event = require(`../events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client))
};

//login-discordbot
client.login(process.env.token)