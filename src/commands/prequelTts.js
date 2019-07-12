module.exports = async function(message) {
  message.channel.send(
    `General Kenobi`,
    {
      tts: true,
    }
  );
  console.log(`[${message.guild.name}][${message.channel.name}] ${message.author.username} is a bold one.`);
};
