const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767, // Using all intents
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./Storage/config.json");

// Maps
// Used for snipe
client.snipes = new Map();

// Initializing the project
require("./handler")(client);

// Anti-crash
process.on('unhandledRejection', (reason, p) => {
    console.log(` [antiCrash] Unhandled Rejection/Catch`);
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(` [antiCrash] Uncaught Exception/Catch`);
    console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(` [antiCrash] Uncaught Exception/Catch (MONITOR)`);
    console.log(err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
    console.log(` [antiCrash] Multiple Resolves`);
    console.log(type, promise, reason);
});

const conf = require('./Storage/config.json');
client.login(conf.Configuration.bot.Token);