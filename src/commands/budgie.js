module.exports = async function(message) {
  await message.channel.send("Wo-oo-wo");
  await message.channel.send("I like... Pie!");
  console.log(`[${message.guild.name}][${message.channel.name}] ${message.author.username} had a budgie, but it died.`);
};
