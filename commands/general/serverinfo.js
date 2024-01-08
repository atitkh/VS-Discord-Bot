const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Gives Server\'s Info'),
    async execute(interaction) {
        const sicon = interaction.guild.iconURL();
        const serverembed = new EmbedBuilder()
            .setTitle('Server Info')
            .setColor("#15f153")
            .setThumbnail(sicon)
            .addFields([{
                    name: "Name",
                    value: interaction.guild.name
                },
                {
                    name: "Created On",
                    value: interaction.guild.createdAt.toString()
                },
                {
                    name: "Total Members",
                    value: interaction.guild.memberCount.toString()
                }
            ])

        return interaction.reply({
            embeds: [serverembed]
        });
    }
}