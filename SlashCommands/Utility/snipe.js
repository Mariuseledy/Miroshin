const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "snipe",
    description: "Snipes the last deleted message",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const msg = client.snipes.get(interaction.channel.id);
        if(!msg) return interaction.followUp({content: "No message to snipe."})
        const snipeEmbed = new MessageEmbed()
            .setAuthor(`Sniped ${msg.author.username}`, msg.author.displayAvatarURL())
            .setDescription(msg.content || 'No message')
            .setImage(msg.image)
            .setColor('RANDOM')
            .setFooter('Miroshin')
            .setTimestamp()

        await interaction.followUp({embeds: [snipeEmbed]});
    }
};
