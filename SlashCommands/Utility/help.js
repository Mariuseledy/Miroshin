const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require('../../Storage/config.json')

module.exports = {
    name: "help",
    description: "Help command",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embedColor = '#ADD8E6';
        const helpMenu = new MessageEmbed()
            .setColor(embedColor)
            .setDescription(`You can support my work by [donating on my ko-fi](${config.Configuration.other["ko-fi"]})`)
            .addFields({
                name: `\`🎉 Fun\``,
                value: `\`f2p\` \`gay\` \`joke\` \`meme\` \`roast\` \`dance\` \`happy\` \`hug\``,
            },{
                name: `\`🔧 Utility\``,
                value: `\`avatar\` \`help\` \`snipe\``,
            });

        await interaction.followUp({ embeds: [helpMenu]});

    }
};
