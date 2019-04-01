const snekfetch = require('snekfetch');
const validUrl = require('valid-url');
const Discord = require('discord.js');
const client = new Discord.Client({
  messageCacheMaxSize: 7
});

const checkEmojiExists = async function(guild, emoji) {
  for (var [key, value] of guild.emojis) {
    if (value.name === emoji) {
      console.log(`[${guild.name}] ${emoji} emoji exists.`);
      return true;
    } 
  }
  // No emoji found, create it if we can
  if (guild.emojis.size >= 50) {
    console.log(`[${guild.name}] 50 emojis already, ${emoji} emoji cannot be added.`);
    return false;
  }
  await guild.createEmoji(`https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/${emoji}.png`, emoji);
  console.log(`[${guild.name}] ${emoji} emoji added.`);
};

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

const shrek2Reaction = async function(reaction, user) {
  // React with shrek2 so the same user can't keep unreacting and reacting
  await reaction.message.react(reaction.emoji);
  
  await reaction.message.channel.send("Somebody once told me the world is gonna roll me");
  await reaction.message.channel.send("I ain't the sharpest tool in the shed");
  await reaction.message.channel.send("She was looking kind of dumb with her finger and her thumb");
  await reaction.message.channel.send("In the shape of an \"L\" on her forehead");
  
  console.log(`[${reaction.message.guild.name}][${reaction.message.channel.name}] ${user.username} thinks ${reaction.message.author.username} is an all-star and needs to get their game on`);
};

const shrekReaction = async function(reaction, user) {
  // React with shrek so the same user can't keep unreacting and reacting
  await reaction.message.react(reaction.emoji);
  
  await reaction.message.react('🇭');
  await reaction.message.react('🇪');
  await reaction.message.react('🇾');
  await reaction.message.react('🇳');
  await reaction.message.react('🇴');
  await reaction.message.react('🇼');
  console.log(`[${reaction.message.guild.name}][${reaction.message.channel.name}] ${user.username} thinks ${reaction.message.author.username} is an all-star`);
};

const mockingReaction = async function(reaction, user) {
  // React with mocking so the same user can't keep unreacting and reacting
  await reaction.message.react(reaction.emoji);
  
  // Make sure the message is long enough
  if (!reaction.message.content.trim()) return;
  let message = reaction.message.content.trim();
  if (message.length < 4) return;
  
  // Ignore messages that are just valid URLs
  if (validUrl.isUri(message)) return;
  
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
};

const regexPatterns = {
  channel: (channel) => new RegExp(`(<#${channel}>)`, "g"),
  role: (role) => new RegExp(`(<@&${role}>)`, "g"),
  user: (user) => new RegExp(`(<@!?${user}>)`, "g"),
  everyone: () => new RegExp('@(everyone|here)', "g"),
};

client.login(process.env.DISCORD_TOKEN);
