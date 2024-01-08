const {
    Events,
    ChannelType
} = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: true,
    async execute(message) {

        if (message.channel.type === ChannelType.DM) {
            return message.reply({
                content: 'You can only use slash commands in servers!',
                ephemeral: true,
            });
        }

        if (message.content.toLowerCase() === "hello") {
            message.channel.send("Hey!")
        }

        if (message.content.toLowerCase().startsWith("v!say")) {
            // check if the user is the owner of the bot
            if (message.author.id !== "592748124020277259") return message.reply("You are not the owner of this bot!")
            const args = message.content.slice(5).trim().split(/ +/g);
            const sayMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(sayMessage);
        }
    }
}