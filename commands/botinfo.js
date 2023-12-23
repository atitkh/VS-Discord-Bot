const Discord = require('discord.js');
var version = '1.0.1';


module.exports = {
    name: 'botinfo',
    description: "Gives bot's Info",
    execute(message, bot, args) {
        let bicon = bot.user.displayAvatarURL;
        const botembed = new Discord.MessageEmbed()
            .setTitle('Bot Info')
            .setColor("#15f153")
            .setThumbnail(bicon)
            .addField("Name", bot.user.username)
            .addField("Created On", bot.user.createdAt)
            .addField("Version", version)

        return message.channel.send(botembed);

    }
}
