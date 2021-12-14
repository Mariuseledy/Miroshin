const { Client, CommandInteraction } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "happy",
    description: "Show how happy you are using a gif",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const url = 'https://api.waifu.pics/sfw/happy';
        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return this.message.channel.send(`An error occured!`)
        }
        await interaction.followUp({content: `${interaction.user.username} is happy`, files: [{ attachment: data.url }]});
    }
};