const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const config = require('../Storage/config.json');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if(file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
    });
    
    client.on("ready", async () => {
        if(config.Settings.SlashCommands.Status === 'GLOBAL'){
            // Register for all the guilds the bot is in
            await client.application.commands.set(arrayOfSlashCommands)
        } else if(config.Settings.SlashCommands.Status === 'GUILD'){
            // Gets the Guild ID from the config file
            const guildId = config.Settings.SlashCommands.GuildID;

            // Register for only one guild
            const guild = client.guilds.cache.get(guildId) //= guildid
            await guild.commands.set(arrayOfSlashCommands)
        } else {
            // Error
            return console.log(`Error\nYou didn't set up the slash commands right.`)
        }
    });
};
