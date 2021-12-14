const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Gets a users main avatar",
    options: [{
        name: "target",
        type: 'USER',
        required: false,
        description: "User to fetch avatar from",
    }],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const target = interaction.options.getUser('target') || interaction.user;
        interaction.followUp({embeds: [new MessageEmbed().setTitle(`${target.username} avatar`).setImage(target.displayAvatarURL({dynamic: true , size: 2048})).setColor('RANDOM')]})
    }
};