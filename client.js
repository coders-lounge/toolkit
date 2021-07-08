const Discord = require('discord.js');
const registry = require('./utils/registry');

class BotClient extends Discord.Client {
	/**
	 * @param {Object} options - The options to initialise the bot with
	 * @param {string} options.token - The bot's token
	 * @param {string} options.prefix - The prefix to use for commands
	 * @param {string} options.commandsDir - The directory to load commands from
	 * @param {string} options.eventsDir - The directory to load events from
	 * @returns {BotClient}
	 * @constructor
	 * @example
	 * 		const bot = new BotClient({
	 * 			token: 'YOUR TOKEN',
	 * 			prefix: '!',
	 * 			commandsDir: './commands',
	 * 			eventsDir: './events'
	 * 		});
	 *
	 * 		bot.on('ready', () => {
	 * 			console.log(`Logged in as ${bot.user.id}`);
	 * 		});
	 * */
	constructor(options) {
		super({
			...options,
			intents: options.intents || [Discord.Intents.NON_PRIVILEGED],
		});

		this.prefix = options.prefix || '';
		this.commandsDir = options.commandsDir || null;
		this.eventsDir = options.eventsDir || null;
		this.commands = new Discord.Collection();

		this.registry = new registry(this, this.commandsDir, this.eventsDir);

		super.login(options.token);
	}
}

module.exports = BotClient;
