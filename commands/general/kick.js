const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server.')
        .addUserOption((option) => option.setName('user').setDescription('user to be kicked'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            const member = interaction.guild.members.cache.get(user.id);
            if (member) {
                member
                    .kick()
                    .then(() => {
                        interaction.reply({
                            content: `Successfully kicked ${user.tag}`,
                            ephemeral: true,
                        });
                    })
                    .catch((err) => {
                        interaction.reply({
                            content: 'I was unable to kick the member',
                            ephemeral: true,
                        });
                        console.error(err);
                    });
            } else {
                interaction.reply({
                    content: 'That user isn\'t in this server!',
                    ephemeral: true,
                });
            }
        } else {
            interaction.reply({
                content: 'Please mention the user to kick!',
                ephemeral: true,
            });
        }
    }
}