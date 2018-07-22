const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client({
  messageCacheMaxSize: 7
});
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


/* 
A good thing to know, in case we want to extend beyond the message cache
But for now I only want the last few messages per channel
// https://discordjs.guide/#/popular-topics/reactions?id=emitting-the-events-yourself
// if we go to v12: https://gist.github.com/Lewdcario/52e1c66433c994c5c3c272284b9ab29c
const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
};


// Listen for uncached reactions, emit the reaction add event after
client.on('raw', async event => {
  // only listen to events we pre-defined above
  if (!events.hasOwnProperty(event.t)) return;
  
  // get the event info
  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel = client.channels.get(data.channel_id) || await user.createDM();

  // do not emit for cached messages (as they already emit)
  if (channel.messages.has(data.message_id)) return;
  
  // get the emoji that was reacted with
  const message = await channel.fetchMessage(data.message_id);
  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  let reaction = message.reactions.get(emojiKey);
  // reate a temporary object that can be passed through the event if last reaction was removed
  if (!reaction) {
    const emoji = new Discord.Emoji(client.guilds.get(data.guild_id), data.emoji);
    reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === client.user.id);
  }
  
  client.emit(events[event.t], reaction, user);
});
*/

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