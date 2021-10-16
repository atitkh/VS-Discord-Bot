const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: "Creates a poll",
    execute(message, args) {
        const pollEmbed = new Discord.MessageEmbed()
            .setTitle("Initiate Poll")
            .setColor(0xFFC300)
            .setDescription("Use this command to initiate a poll");

        if (!args[1]) {
            message.channel.send(pollEmbed);
        }
        else {
            let msgArgs = args.slice(1).join(" ");
            message.channel.send("**" + msgArgs + "**").then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
                //message.delete(2000);
            });
        }
    }
}
