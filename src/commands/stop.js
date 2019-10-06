const snekfetch = require('snekfetch');

module.exports = async function(message, user) {
  // Make sure the message is not too
  if (!message.content.trim()) return;
  let message = message.content.replace(/<.*?>/g, '').trim().toUpperCase();
  if (message.length < 40) return;

  // Modify the message to resolve channel mentions
  if (message.mentions.channels.size) {
    for (var [key, value] of message.mentions.channels) {
      message = message.replace(regexPatterns.channel(key), `#${value.name}`);
    }
  }
  // Modify the message to resolve user mentions
  if (message.mentions.users.size) {
    for (var [key, value] of message.mentions.users) {
      message = message.replace(regexPatterns.user(key), `@${value.username}`);
    }
  }
  // Modify the message to resolve role mentions
  if (message.mentions.roles.size) {
    for (var [key, value] of message.mentions.roles) {
      message = message.replace(regexPatterns.role(key), `@${value.name}`);
    }
  }
  // Modify the message to remove /stop from the start, if it exists
  if (message.startsWith('/stop ')) {
    message = message.slice('/stop '.length);
  }
  
  // Do not need to resolve everyone/here

  // do the dew
	const username = process.env.imgFlipUsername || "";
	const password = process.env.imgFlipPassword || "";
  const data = {
		template_id: 56409819,
		username,
		password,
		boxes: [
			{
				text: `STOP TRYING TO MAKE ${message} HAPPEN`,
			},
			{
				text: "IT'S NOT GOING TO HAPPEN",
			},
		],
	};
  
  try {
    const { body } = await snekfetch.post('https://api.imgflip.com/caption_image').send(data);
    const reply = `${body.url}`;
    message.channel.send(reply);
    console.log(`[${message.guild.name}][${message.channel.name}] ${reply}`);
  } catch (e) {
    console.log(e);
  }
  

  // Log it in console
  
};

const regexPatterns = {
  channel: (channel) => new RegExp(`(<#${channel}>)`, "g"),
  role: (role) => new RegExp(`(<@&${role}>)`, "g"),
  user: (user) => new RegExp(`(<@!?${user}>)`, "g"),
  everyone: () => new RegExp('@(everyone|here)', "g"),
};
