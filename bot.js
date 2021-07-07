const bot = require('./client');

require('dotenv').config();

new bot({
	token: process.env.BOT_TOKEN,
	prefix: '%',
	eventsDir: './events',
	commandsDir: './commands',
});
