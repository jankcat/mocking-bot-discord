const snekfetch = require('snekfetch');
const validUrl = require('valid-url');
const Discord = require('discord.js');
const client = new Discord.Client({
  messageCacheMaxSize: 7
});

client.on('error', console.error);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async (member) => {
  if (member.id !== client.user.id) return;
  console.log(`[${member.guild.name}] Joined server. Checking for mocking emoji.`);
  for (var [key, value] of member.guild.emojis) {
    if (value.name === 'mocking') {
      console.log(`[${member.guild.name}] mocking emoji exists.`);
      return;
    } 
  }
  // No mocking found, create it if we can
  if (member.guild.emojis.size >= 50) {
    console.log(`[${member.guild.name}] 50 emojis already, mocking emoji cannot be added.`);
    return;
  }
  await guild.createEmoji('https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/mocking.png', 'mocking');
  console.log(`[${member.guild.name}] mocking emoji added.`);
});

client.on('messageReactionAdd', async (reaction, user) => {
  // Only listen to spongebob emoji, only the first time per message
  if (reaction.emoji.name !== 'mocking' || reaction.count !== 1) return;
  
  // Make sure the message is long enough
  if (!reaction.message.content.trim()) return;
  let message = reaction.message.content.trim();
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
  
  // Ignore messages that are just valid URLs
  if (validUrl.isUri(message)) return;
  
  // React with mocking so the same user cant keep unreacting and reacting
  reaction.message.react(reaction.emoji);
  
  // Modify the message to resolve channel mentions
  if (reaction.message.mentions.channels.size) {
    for (var [key, value] of reaction.message.mentions.channels) {
      message = message.replace(regexPatterns.channel(key), `#${value.name}`);
    }
  }
  // Modify the message to resolve user mentions
  if (reaction.message.mentions.users.size) {
    for (var [key, value] of reaction.message.mentions.users) {
      message = message.replace(regexPatterns.user(key), `@${value.username}`);
    }
  }
  // Modify the message to resolve role mentions
  if (reaction.message.mentions.roles.size) {
    for (var [key, value] of reaction.message.mentions.roles) {
      message = message.replace(regexPatterns.role(key), `@${value.name}`);
    }
  }
  // Do not need to resolve everyone/here
  
  // do the dew
  // https://wt-22f5e1b994607080041c947354b7f9a5-0.run.webtask.io/sponge?message=
  const { body } = await snekfetch.get('https://wt-22f5e1b994607080041c947354b7f9a5-0.run.webtask.io/sponge').query({ message: message });
  const reply = `${user.username} mocking ${reaction.message.author.username}: ${body}`;
  reaction.message.channel.send(reply);
  
  // Log it in console
  console.log(`[${reaction.message.guild.name}][${reaction.message.channel.name}] ${reply}`);
});

const regexPatterns = {
  channel: (channel) => new RegExp(`(<#${channel}>)`, "g"),
  role: (role) => new RegExp(`(<@&${role}>)`, "g"),
  user: (user) => new RegExp(`(<@!?${user}>)`, "g"),
  everyone: () => new RegExp('@(everyone|here)', "g"),
};

client.login(process.env.DISCORD_TOKEN);
