module.exports = async function(message) {
  message.channel.send(
    `General Kenobi`,
    {
      tts: true,
    }
  );
};
