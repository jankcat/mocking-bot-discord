const fetch = require('node-fetch');

module.exports = async function(message, user) {
  try {
    // Make sure the message is not too
    if (!message.content.trim()) return;
    let newMsg = message.content.replace(/<.*?>/g, '').trim().toUpperCase();
    if (newMsg.length > 40) return;

    // Modify the message to resolve channel mentions
    if (message.mentions.channels.size) {
      for (var [key, value] of message.mentions.channels) {
        newMsg = newMsg.replace(regexPatterns.channel(key), `#${value.name}`);
      }
    }
    // Modify the message to resolve user mentions
    if (message.mentions.users.size) {
      for (var [key, value] of message.mentions.users) {
        newMsg = newMsg.replace(regexPatterns.user(key), `@${value.username}`);
      }
    }
    // Modify the message to resolve role mentions
    if (message.mentions.roles.size) {
      for (var [key, value] of message.mentions.roles) {
        newMsg = newMsg.replace(regexPatterns.role(key), `@${value.name}`);
      }
    }
    // Modify the message to remove /stop from the start, if it exists
    if (newMsg.startsWith('/stop ')) {
      newMsg = newMsg.slice('/stop '.length);
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
          text: `STOP TRYING TO MAKE ${newMsg} HAPPEN`,
        },
        {
          text: "IT'S NOT GOING TO HAPPEN",
        },
      ],
    };
    
    const res = await fetch('https://api.imgflip.com/caption_image', { method: 'POST', body: data });
    const json = await response.json();
    console.log(json);
    
    const reply = `${res.body.url}`;
    newMsg.channel.send(reply);
    console.log(`[${newMsg.guild.name}][${newMsg.channel.name}] ${reply}`);
  } catch (e) {
    console.log(e);
  }
};

const regexPatterns = {
  channel: (channel) => new RegExp(`(<#${channel}>)`, "g"),
  role: (role) => new RegExp(`(<@&${role}>)`, "g"),
  user: (user) => new RegExp(`(<@!?${user}>)`, "g"),
  everyone: () => new RegExp('@(everyone|here)', "g"),
};
