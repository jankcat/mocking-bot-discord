# mocking-bot-discord

## Example

![ExAmPlE](https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/example.png)

## Mocking Criteria

- Listens for :mocking: reaction on messages, responds by mocking the message.
- Example emoji is included in this repo (see: `mocking.png`). Bot will add mocking emoji on server-join if it does not exist
- Only responds to the first mocking reaction and reacts with mocking itself after a user does, to prevent repeat mockings
- Ignores bot reactions & bot messages
- Only goes back 7 messages per channel to prevent out-of-context mocking
- Ignores messages over a day old
- Ignores messages that are just valid URLs, as per https://github.com/ogt/valid-url

## Other Things

It does this:

![heynow](https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/heynow.png)

And this:

![yourearockstar](https://raw.githubusercontent.com/jankcat/mocking-bot-discord/master/shrek2-example.PNG)

Also:

```
/prequel some search terms
/guilty
```

## Usage

Add by visiting: https://discordapp.com/oauth2/authorize?client_id=470425725808279573&scope=bot&permissions=1073863744

## Roll-your-own

1. Clone the repo
2. Have docker and docker-compose installed and good-to-go
3. Create a bot in the Discord developer console
4. `export DISCORD_TOKEN=YOUR_TOKEN`
5. `docker-compose up -d`
