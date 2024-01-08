const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pings a user.')
        .addUserOption((option) => option.setName('user').setDescription('user to be pinged')),
    async execute(interaction) {
        const rUser = interaction.options.getUser('user');
        if (rUser) {
            const member = interaction.guild.members.cache.get(rUser.id);
            if (member) {
                let pinMessage = `Your friends are waiting for you in the voice channel! ${member}`;
                await interaction.reply(pinMessage);
                for (let i = 0; i < 9; i++) {
                    await interaction.channel.send(`Your friends are waiting for you in the voice channel! ${member}`);
                }
            } else {
                await interaction.reply("Invalid User!");
            }
        } else {
            await interaction.reply({
                content: 'Please specify a user you want to ping!',
                ephemeral: true
            });
        }
    }
}