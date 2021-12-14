const { Client, CommandInteraction, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
    name: "f2p",
    description: "Show how f2p you are",
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

        const canvas = Canvas.createCanvas(332, 262)
        const ctx = canvas.getContext('2d')
        
        const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/883981970743365674/890567362162614322/d827d44fbb89820f5f7f824097c3a504_8173324892886462733.jpg")
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        const targetAvatar = await Canvas.loadImage(target.displayAvatarURL({
            format: 'png'
        }))
        ctx.drawImage(targetAvatar, 77, 80, 80, 80)
        
        const attachment = new MessageAttachment(canvas.toBuffer(), 'f2p.png')
        try{
            await interaction.followUp({files: [attachment]})
        }
        catch(error) {
            console.log('Error inside the f2p command.' + error)
        }
    }
};