const snekfetch = require('snekfetch');
const validUrl = require('valid-url');

module.exports = async function(reaction, user) {
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
  // Modify the message to remove /prequel from the start, if it exists
  if (message.startsWith('/prequel ')) {
    message = message.slice('/prequel '.length);
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
