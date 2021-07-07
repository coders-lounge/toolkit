const Discord = require('discord.js');
const registry = require('./utils/registry');

class BotClient extends Discord.Client {
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
