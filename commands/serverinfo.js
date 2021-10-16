const Discord = require('discord.js');

module.exports = {
    name:'serverinfo',
    description: "Gives Server's Info",
    execute(message, args){
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.MessageEmbed()
            .setTitle('Server Info')
            .setColor("#15f153")
            .setThumbnail(sicon)
            .addField("Name", message.guild.name)
            .addField("Created On", message.guild.createdAt)
            .addField("Total Members", message.guild.memberCount)

        return message.channel.send(serverembed);
        
    }
}
