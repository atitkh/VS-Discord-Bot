const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const version = require('../../package.json').version;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Gives bot\'s Info'),
    async execute(interaction) {
        const bicon = interaction.client.user.displayAvatarURL();
        const botembed = new EmbedBuilder()
            .setTitle('Bot Info')
            .setColor("#15f153")
            .setThumbnail(bicon)
            .addFields([{
                    name: "Name",
                    value: interaction.client.user.username
                },
                {
                    name: "Created On",
                    value: (interaction.client.user.createdAt).toString()
                },
                {
                    name: "Version",
                    value: version
                }
            ])

        return interaction.reply({
            embeds: [botembed]
        });
    }
}