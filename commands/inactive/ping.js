const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "Ping a user",
    execute(message, args) {
        const rUser = message.mentions.users.first();

        if (rUser) {
            const member = message.guild.member(rUser);
            if (member) {
                let pinMessage = `Your friends are waiting for you in the voice channel! ${member}`;
                for (let i = 0; i < 9; i++) {
                    message.channel.send(pinMessage);
                }
                return message.channel.send(pinMessage);
            } else {
                message.channel.send("Invalid User!");
            }
        } else {
            message.reply('Please specify a user you want to ping!');
        }
    }
}
