const Discord = require('discord.js');
const { prefix, token } = require('../config.json')
const fetch = require('node-fetch');

var serverip = '3.7.169.95'
var started = false;

module.exports = {
    name: 'awsRequest',
    description: "Sents a request to start/stop/reboot and instance",
    execute(message, args) {
        const csserverEmbed = new Discord.MessageEmbed()
            .setTitle("CS Server")
            .setColor(0xFFC300)
            .setDescription("You can use this command to start/stop a CS Server. Use the following commands")
            .addField('Start', `use '${prefix}csserver start' to start the server`)
            .addField('Stop', `use '${prefix}csserver stop' to stop the server`);

        if (!args[1]) {
            message.channel.send(csserverEmbed);
        }
        else {
            if (args[1] === 'start') {
                if(!started){
                fetch('https://lp3nnpbzj2.execute-api.ap-south-1.amazonaws.com/ifttt/start_instances')
                message.channel.send('The server is starting now. Connect to ' + serverip + ':27015 ');
                started = true
                }
                else if(started){
                    message.channel.send('The server is already running.')
                }
                
            }
            else if (args[1] === 'stop') {
                if(started){
                fetch('https://lp3nnpbzj2.execute-api.ap-south-1.amazonaws.com/ifttt/stop_instances')
                message.channel.send('The server is stopping now.');
                started = false
                }
                else if(!started){
                    message.channel.send('Unable to stop. The server isn\'t running!')
                }
                
            }
            else {
                message.channel.send(`Unknown Command. Please type ${prefix}csserver to learn more.`);
            }
        }
    }
}
