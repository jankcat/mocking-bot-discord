module.exports = async function(message, term) {
  const image = new Attachment('https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/guilty.gif);
  message.channel.send(image);
};
