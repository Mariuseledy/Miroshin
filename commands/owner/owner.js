const { Message, Client } = require("discord.js");
const config = require('../../Storage/config.json')

module.exports = {
    name: "owner",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.author.id !== config.Configuration.bot.ownerID) return message.channel.send({content: `Only the owner can use this command!`});
        message.channel.send({content: `You are the owner!`});
    },
};
