require('date-utils');
module.exports = async (client) => {
    //command_loading
    const commandlist = require("../data/commands")
    await client.application.commands.set(commandlist)

    //icon&name set
    const iconurl = await client.user.displayAvatarURL()
    const name = await client.user.username
    global.boticon = iconurl;
    global.botname = name;

    setInterval(() => {
        const size = client.guilds.cache.size
        client.user.setActivity({
            name: `/help｜${size}server`
        })
    }, 10000)

    console.log("ready")
}