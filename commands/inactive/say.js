const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Repeats a user')
        .addStringOption((option) => option.setName('message').setDescription('Message to be repeated')),
    async execute(interaction) {
        const message = interaction.options.getString('message');

        if (message) {
            await interaction.reply(message);
        } else {
            interaction.reply({
                content: 'Please provide a message to repeat!',
                ephemeral: true,
            });
        }
    }
}