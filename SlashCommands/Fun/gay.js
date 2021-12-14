const { Client, CommandInteraction, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
    name: "gay",
    description: "That's gay",
    options: [{
        name: "target",
        type: 'USER',
        required: false,
        description: "Use it on someone else",
    }],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const target = interaction.options.getUser('target') || interaction.user;
        
        const canvas = Canvas.createCanvas(400, 400)
        const ctx = canvas.getContext('2d')

        const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/883981970743365674/899360407679029298/wp3641679-rainbow-flag-wallpapers.jpg")
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        const avatar = await Canvas.loadImage(target.displayAvatarURL({ format: 'png' }))
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        const attachment = new MessageAttachment(canvas.toBuffer(), 'gay.png')
        try{
            await interaction.followUp({content: `That's gay`, files: [attachment]})
        }
        catch(error) {
            console.log('Error inside the howcouldyou command.\n' + error)
        }
    }
}