const client = require("../index");
const { MessageEmbed } = require("discord.js");
const config = require('../Storage/config.json');

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        // If you want to add private messages with the users you can remove 
        // that and add await interaction.deferReply({ ephemeral: true }); 
        // on every command
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "This command no longer exists." });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        
        // Checks if the bot is in maintenance before executing the interaction
        if(config.Settings.Maintenance.Status === "OFF"){
            // Runs the command
            cmd.run(client, interaction, args); 
        }else if(config.Settings.Maintenance.Status === "ON"){
            // Maintenance message
            interaction.followUp({embeds: [new MessageEmbed().setColor('#ADD8E6').setImage(config.Settings.Maintenance.Image || client.user.displayAvatarURL()).setTitle(`The bot is currently in maintenance`).setDescription(`Please be patient, the developer is trying to fix the issues.`).addField(`Issue(s):`, `${config.Settings.Maintenance["Issue(s)"]}`)]})
        }else {
            // Error
            console.log(`ERROR\nYou didn't specified the maintenance status!`);
        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Select Menu Handling
    if(interaction.isSelectMenu()){
        await interaction.deferUpdate();
    }

    // Button Handling
    if(interaction.isButton()){
        await interaction.deferUpdate();
    }

});
