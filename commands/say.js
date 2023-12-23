const Discord = require('discord.js');

module.exports = {
    name: 'say',
    description: "Repeats a user",
    execute(message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("NO");
        let botmessage = args.slice(1).join(" ");
        message.delete().catch();
        message.channel.send(botmessage);

    }
}
