const Discord = require('discord.js');

module.exports = {
    name: 'report',
    description: "Reports a user",
    execute(message, args) {
        const rUser = message.mentions.users.first();

        if (rUser) {
            const member = message.guild.member(rUser);
            let reason = args.join(" ").slice(22);
            if (member) {
                let reportEmbed = new Discord.MessageEmbed()
                    .setTitle("Report")
                    .setColor("#15f153")
                    .addField("Reported User", `${member} with ID: ${member.id}`);

                return message.channel.send(reportEmbed);
            } else {
                message.channel.send("Invalid User!");
            }
        } else {
            message.reply('Please specify a user!');
        }




    }
}
