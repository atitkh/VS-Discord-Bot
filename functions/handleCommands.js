const {REST, Routes, Guild} = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            if (folder === 'inactive') continue;
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../${path}/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST().setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log('Started refreshing commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commandArray
                    },
                );

                console.log('Successfully reloaded commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    };
}