const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client({
  messageCacheMaxSize: 7
});
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', async (reaction, user) => {
  // Only listen to spongebob emoji, only the first time per message
  if (reaction.emoji.name !== 'mocking' || reaction.count !== 1) return;
  
  // Make sure the message is long enough
  if (!reaction.message.content.trim()) return;
  const message = reaction.message.content.trim();
  if (message.length < 4) return;
  
  // Ignore bot messages and reactions
  if (reaction.message.system || reaction.message.author.bot || user.bot) return;
  
  // Ignore DMs
  if (!reaction.message.channel.name) return;
  if (!reaction.message.guild || !reaction.message.guild.available) return;
  
  // Make sure the message was sent in the last day
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (reaction.message.createdAt < yesterday) return;  
  
  // React with mocking so the same user cant keep unreacting and reacting
  reaction.message.react(reaction.emoji);
  
  // do the dew
  // https://wt-22f5e1b994607080041c947354b7f9a5-0.run.webtask.io/sponge?message=
  const { body } = await snekfetch.get('https://wt-22f5e1b994607080041c947354b7f9a5-0.run.webtask.io/sponge').query({ message: message });
  const reply = `Requested by ${user.username}: ${body}`;
  reaction.message.channel.send(reply);
  
  // Log it in console
  console.log(`[${reaction.message.guild.name}][${reaction.message.channel.name}] ${reply}`);
});

client.login(process.env.DISCORD_TOKEN);