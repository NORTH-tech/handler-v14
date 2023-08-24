module.exports = async (client, message) => {
    if (!message.content.startsWith(prefix)) return;
    const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
    try {
        const run = require(`../commands//${command}`);
        await run(message, args, client)
    } catch { }
}