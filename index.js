const Discord = require('discord.js');
const { prefix } = require('./config.json');
const token = process.env['token']

const bot = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
});

bot.login(token);

//reaction msg id 
const msgId = '726849435639873606';

//users for multiple servers
const newUsers = [];

//file command handling 
const fs = require('fs');
bot.commands = new Discord.Collection();
const commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'))


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

//Bot status set
bot.once('ready', () => {
    console.log(`${bot.user.username} is Ready!`);
    bot.user.setActivity('the members', {
        type: 'WATCHING'
    }).catch(console.error);
});

//member joined
bot.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
    newUsers[guild.id].set(member.id, member.user);
    const user = newUsers[guild.id].map(u => u.toString()).join(" ");
    member.guild.channels.cache.find(c => c.name === "welcome-channel").send(`Welcome to ${member.guild}, ${user}!`);
    newUsers[guild.id].clear();

});

//message reaction
//added
bot.on('messageReactionAdd', async (reaction, user) => {

    let applyRole = async () => {
        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        try {
            if (role && member) {
                console.log("Role and member found.");
                await member.roles.add(role);
                console.log("Done.");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    if (reaction.message.partial) {
        try {
            let msg = await reaction.message.fetch();
            console.log(msg.id);
            if (msg.id === msgId) {
                console.log("Cached")
                applyRole();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.log("Not a partial.");
        if (reaction.message.id === msgId) {
            console.log(true);
            applyRole();
        }
    }
});

//removed
bot.on('messageReactionRemove', async (reaction, user) => {
    let removeRole = async () => {
        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        try {
            if (role && member) {
                console.log("Role and member found.");
                await member.roles.remove(role);
                console.log("Done.");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    if (reaction.message.partial) {
        try {
            let msg = await reaction.message.fetch();
            console.log(msg.id);
            if (msg.id === msgId) {
                console.log("Cached")
                removeRole();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.log("Not a partial.");
        if (reaction.message.id === msgId) {
            console.log(true);
            removeRole();
        }
    }
})

//On message commands
bot.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.content === "Hello") {
        message.reply('Hello Friend!')
    }

    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case 'serverinfo':
            bot.commands.get('serverinfo').execute(message, args);
            break;

        case 'botinfo':
            bot.commands.get('botinfo').execute(message, bot, args);
            break;

        case 'help':
            const helpembed = new Discord.MessageEmbed()
                .setColor(0x1D82B6)

            let commandsFound = 0;

            for (var cmd in commands) {
                helpembed.addField(`**${commands[cmd].name}**`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix}${commands[cmd].usage}`);
            }

            message.author.send(helpembed)
            message.channel.send(`**Check your DMs ${message.author}! **`)
            break;

        case 'report':
            bot.commands.get('report').execute(message, args);
            break;

        case 'poll':
            bot.commands.get('poll').execute(message, args);
            break;

        case 'csserver':
            bot.commands.get('awsRequest').execute(message, args);
            break;

        case 'kick':
            bot.commands.get('kick').execute(message, args);
            break;

        case 'say':
            bot.commands.get('say').execute(message, args);
            break;

        case 'doge':
            bot.commands.get('doge').execute(message, args);
            break;
    }
})




//web run
const express = require('express');//Set up the express module
const app = express();
const router = express.Router();
const path = require('path')//Include the Path module

//Set up the Express router
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/', router);


//set up the Express server to listen on port 3000 and logs some messages when the server is ready
let server = app.listen(3000, function(){
  console.log("App server is running on port 3000");
});