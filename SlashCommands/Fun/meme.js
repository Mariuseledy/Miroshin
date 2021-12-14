const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "meme",
    description: "Random meme",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const url = 'https://meme-api.herokuapp.com/gimme';
        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return this.message.channel.send(`An error occured!`)
        }
        let embed = new MessageEmbed()
                .setTitle(`*Random meme requested by ${interaction.user.username}*`)
                .setColor('RANDOM')
                .setImage(data.url)
                .setTimestamp()
                .setFooter('Miroshin')
        await interaction.followUp({embeds: [embed]});
    }
};