module.exports = async function(guild, emoji) {
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

