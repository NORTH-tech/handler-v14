//module-loading
const { Client, GatewayIntentBits, REST, Routes } = require("discord.js")
const { readdirSync } = require('fs');
require('dotenv').config();

//create-client
const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger)
});

//client-event-loading
const events = readdirSync(`./events`).filter(files => files.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client))
};

//set-slashCommands
const rest = new REST({version: "10"}).setToken(process.env.token)
const commandsFiles = readdirSync("./commands/slash").filter(f => f.endsWith(".js"))
const commands = []
for (const file of commandsFiles) {
    const command = require(`./commands/slash/${file}`)
    commands.push(command.data.toJSON());
}
(async () => {
    await rest.put(Routes.applicationCommands(process.env.clientid), { body: commands });
    console.log("success commands register")
})();


//login-discordbot
client.login(process.env.token)