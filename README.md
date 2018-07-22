# mocking-bot-discord

- Listens for :mocking: reaction on messages, responds by mocking the message.
- Only responds to the first mocking reaction and reacts with mocking itself after a user does, to prevent repeat mockings
- Ignores bot reactions & bot messages
- Only goes back 7 messages per channel to prevent out-of-context mocking
- Ignores messages from before yesterday

Add by visiting: https://discordapp.com/oauth2/authorize?client_id=470425725808279573&scope=bot&permissions=117760

`export DISCORD_TOKEN=YOUR_TOKEN`

`docker-compose up -d`