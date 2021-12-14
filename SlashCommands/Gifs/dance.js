const { Client, CommandInteraction } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "dance",
    description: "Dance, dance, dance",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const url = 'https://api.waifu.pics/sfw/dance';
        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return this.message.channel.send(`An error occured!`)
        }
        await interaction.followUp({content: `${interaction.user.username} is dancing`, files: [{ attachment: data.url }]});
    }
};