module.exports = async function(reaction, user) {
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
