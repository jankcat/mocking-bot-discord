module.exports = async function(reaction, user) {
  // React with shrek2 so the same user can't keep unreacting and reacting
  await reaction.message.react(reaction.emoji);

  await reaction.message.channel.send("Somebody once told me the world is gonna roll me");
  await reaction.message.channel.send("I ain't the sharpest tool in the shed");
  await reaction.message.channel.send("She was looking kind of dumb with her finger and her thumb");
  await reaction.message.channel.send("In the shape of an \"L\" on her forehead");

  console.log(`[${reaction.message.guild.name}][${reaction.message.channel.name}] ${user.username} thinks ${reaction.message.author.username} is an all-star and needs to get their game on`);
};
