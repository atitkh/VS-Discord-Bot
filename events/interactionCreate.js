const {
    Events
} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
                console.error(error);
            }
        } else if (interaction.isButton()) {
            // respond to the button
        } else if (interaction.isStringSelectMenu()) {
            // respond to the select menu
        }
    },
};