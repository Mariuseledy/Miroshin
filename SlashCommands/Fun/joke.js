const { Client, CommandInteraction } = require("discord.js");
const giveMeAJoke = require('discord-jokes');

module.exports = {
    name: "joke",
    description: "Random dad joke",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        giveMeAJoke.getRandomDadJoke (async function (joke) {
            await interaction.followUp({content: joke});
        })
    }
};