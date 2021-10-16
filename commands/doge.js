const fetch = require('node-fetch');
const Discord = require('discord.js');


module.exports = {
  name: 'doge',
  description: "Sends a data of dogetrix collection activity.",
  execute(message, args) {
    const rUser = message.mentions.users.first();
    const atitID = '592748124020277259';
    const sumanID = '722887645612605482';
    const anjitID = '625260107978244108';
    const ankitID = '239431431594442753';
    const registeredIDs = [atitID, sumanID, anjitID, ankitID];

    if (rUser) {
      const member = message.guild.member(rUser);
      if (member) {
        switch (member.id) {
          case atitID:
            var data = pullData('atitJSON');
            break;

          case ankitID:
            var data = pullData('ankitJSON');
            break;

          case sumanID:
            var data = pullData('sumanJSON');
            break;

          case anjitID:
            var data = pullData('anjitJSON');
            break;
          
          default:
            var data = 'Empty';
            break; 
        }

          if(contains(registeredIDs, member.id)){

          //fetch from api
            data.then(function(data){
            console.log(data);
            if(data.withInfo.remDays < 1){
            remTime = data.withInfo.remHrs + ' Hrs';
            }
            else{
              remTime = data.withInfo.remDays + ' Days';
            }
            let msgEmbed = new Discord.MessageEmbed()
            
            .setColor('#0099ff')
            .setTitle('DOGETRIX INFO')
            .setDescription(`Here's the requested info for ${member}`)
            .setThumbnail('https://i.imgur.com/DjCRZgq.png')
            .addFields(
              { name: 'Active Acc', value: data.totalAcc, inline: true } ,
              { name: 'Withdrawable', value: data.withInfo.wCount, inline : true},
              { name: 'Stake Level', value: data.withInfo.stakeInt },
            )
            .addFields(
              { name: 'Balance', value: data.totalBal + ' DOGE' , inline: true },
              { name: 'USD Balance', value: data.totalUSD + ' USD' , inline: true},
              { name: 'Highest Balance', value: data.withInfo.highestBal + ' mDoge'}
            )
            
            .addField('Next Withdraw In', remTime  + Array(5).fill('\xa0').join('') +' i.e.' + Array(5).fill('\xa0').join('') + data.withInfo.withDate, true)
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter('VSDoge API', 'https://i.imgur.com/DjCRZgq.png')

            return message.channel.send(msgEmbed), message.channel.send(data.withInfo.wCountIn24Hrs + ' accounts will be ready to withdraw in next 24 Hrs.');
            });
          }
          else{
            message.channel.send("The specified user is not registered.");
          }
      }
      else {
        message.channel.send("Invalid User!");
      }
    } else {
      message.reply('Please specify a user!');
    }
    }
  }

function contains(a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

function pullData(name) {
  var url = "https://api.atit286.repl.co/" + name;
  return fetch(url).then(function(response) {
    return response.json();
  })
}