// const Discord = require('discord.js');
// const bot = new Discord.Client();
const { SlashCommandBuilder } = require('@discordjs/builders');

const kickCommand = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user from the guild.')
    .addUserOption((option) =>
        option.setName('user').setDescription('user to be kicked')
    );

module.exports = {
    command: kickCommand.toJSON(),
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
