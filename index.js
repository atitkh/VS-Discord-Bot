const express = require('express'); //Set up the express module
const app = express();
const router = express.Router();
const path = require('path') //Include the Path module

require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require('discord.js');
const fs = require('fs');
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./commands');

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventsFiles, 'events');
  client.handleCommands(commandFolders, 'commands');
  client.login(process.env.TOKEN);
})();

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

//Set up the Express router
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/', router);

//set up the Express server to listen on port 3000 and logs some messages when the server is ready
let server = app.listen(3000, function () {
  console.log("App server is running on port 3000");
});