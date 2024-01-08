const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member and ban them.')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('The member to ban')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        if (user) {
            const member = interaction.guild.members.cache.get(user.id);
            if (member) {
                member
                    .ban()
                    .then(() => {
                        interaction.reply({
                            content: `Successfully banned ${user.tag}`,
                            ephemeral: true,
                        });
                    })
                    .catch((err) => {
                        interaction.reply({
                            content: 'I was unable to ban the member',
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
                content: 'Please mention the user to ban!',
                ephemeral: true,
            });
        }
    }
}