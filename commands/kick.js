const Discord = require('discord.js');
const bot = new Discord.Client();


module.exports = {
    name:'kick',
    description: "Kicks the specified user",
    execute(message, args){
        if (message.member.hasPermission(['KICK_MEMBERS'])) {
            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.kick('You were kicked from the server!').then(() => {
                        message.channel.send('Kicked!');
                    }).catch(err => {
                        message.reply('An error occured.');
                        console.log(err);
                    });
                } else {
                    message.channel.send("Invalid User!");
                }
            } else {
                message.reply('Please specify a user!');
            }
        }
        
    }
}
