const { Client, CommandInteraction } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "hug",
    description: "Hug someone in the server",
    options: [{
        name: "user",
        type: 'USER',
        required: true,
        description: "User to hug",
    }],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('user');
        const url = 'https://api.waifu.pics/sfw/cuddle';
        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return this.message.channel.send(`An error occured!`)
        }
        await interaction.followUp({content: `${interaction.user.username} hugged ${user.username}`, files: [{ attachment: data.url }]});
    }
};