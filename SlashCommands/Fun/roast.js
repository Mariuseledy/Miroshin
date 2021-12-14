const { Client, CommandInteraction } = require("discord.js");
const roast = require('../../Storage/roasts.json')

module.exports = {
    name: "roast",
    description: "Roasts someone in the server",
    options: [{
        name: "target",
        type: 'USER',
        required: true,
        description: "User to roast",
    }],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const target = interaction.options.getUser('target');
        var randomAnswer = roast.roasts[Math.floor(Math.random() * roast.roasts.length)];
		await interaction.followUp({content: target.username + ' ' + randomAnswer})
    }
};
