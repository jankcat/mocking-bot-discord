module.exports = async function(message) {
    message.channel.send(
        `Sure, ${message.author.username} will be on "soon", "maybe", "most likely", "probably not...", but yeah maybe after I get home from this meeting. Night guys, see ya tomorrow.`
    );
    console.log(`[${message.guild.name}][${message.channel.name}] ${message.author.username} will be on "soon", "most likely".`);
};
