const Discord = require('discord.js');
const checkEmojiExists = require('./checkEmojiExists');
const shrek2Reaction = require('./commands/shrek2Reaction');
const shrekReaction = require('./commands/shrekReaction');
const mockingReaction = require('./commands/mockingReaction');
const prequelMemes = require('./commands/prequelMemes');
const prequelTts = require('./commands/prequelTts');
const darthPlagueis = require('./commands/darthPlagueis');
const guilty = require('./commands/guilty');

const client = new Discord.Client({
  messageCacheMaxSize: 7
});

client.on('error', console.error);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', async (guild) => {
  console.log(`[${guild.name}][guildCreate] Joined server. Checking for emojis.`);
  await checkEmojiExists(guild, 'mocking');
  await checkEmojiExists(guild, 'shrek');
  await checkEmojiExists(guild, 'shrek2');
});

client.on('guildMemberAdd', async (member) => {
  if (member.id !== client.user.id) return;
  console.log(`[${member.guild.name}][guildMemberAdd] Joined server. Checking for emojis.`);
  await checkEmojiExists(member.guild, 'mocking');
  await checkEmojiExists(member.guild, 'shrek');
  await checkEmojiExists(member.guild, 'shrek2');
});

client.on('message', async (message) => {
  // Ignore bot messages
  if (message.system || message.author.bot) return;

  const prequelCommand = '/prequel';
  if (message.content.startsWith(prequelCommand)) {
    const args = message.content.slice(prequelCommand.length + 1); // plus space
    await prequelMemes(message, args);
  } else if (message.content.toLowerCase() === 'hello there') {
    await prequelTts(message);
  } else if (message.content.toLowerCase() === '/guilty') {
    await guilty(message);
  } else if (message.content.toLowerCase().startsWith('did you ever hear the tragedy of darth')) {
    await darthPlagueis(message);
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  // Only the first time per message
  if (reaction.count !== 1) return;

  // Ignore DMs
  if (!reaction.message.channel.name) return;
  if (!reaction.message.guild || !reaction.message.guild.available) return;

  // Ignore bot messages and reactions
  if (reaction.message.system || reaction.message.author.bot || user.bot) return;

  // Make sure the message was sent in the last day
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (reaction.message.createdAt < yesterday) return;

  if (reaction.emoji.name === 'mocking') await mockingReaction(reaction, user);
  if (reaction.emoji.name === 'shrek') await shrekReaction(reaction, user);
  if (reaction.emoji.name === 'shrek2') await shrek2Reaction(reaction, user);
});

client.login(process.env.DISCORD_TOKEN);
