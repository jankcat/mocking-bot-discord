const { Attachment } = require('discord.js');

module.exports = async function(message, term) {
  var gif = gifs[Math.floor(Math.random()*gifs.length)];
  const image = new Attachment(gif);
  message.channel.send(image);
  console.log(`[${message.guild.name}][${message.channel.name}] ${message.author.username} is guilty and sentenced to the electric shaver.`);
};

const gifs = [
  'https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/guilty.gif',
  'https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/guilty2.gif',
  'https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/guilty3.gif',
  'https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/guilty4.gif',
  'https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/guilty5.gif',
];
