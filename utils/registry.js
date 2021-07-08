const { requireAll } = require('./helpers');

class registry {
	/**
	 * Registers all events and commands
	 * @param {object} client - Instance of the bot
	 * @param {string} commandsDir - Directory where the commands are located
	 * @param {string} eventsDir - Directory where the events are located
	 * @constructor
	 * @returns {registry}
	 * */
	constructor(client, commandsDir, eventsDir) {
		if (commandsDir) this.registerCommands(client, commandsDir);
		if (eventsDir) this.registerEvents(client, eventsDir);
	}

	/**
	 * Registers a single command
	 * @param {object} client - Instance of the bot
	 * @param {object} command - The command to register
	 * @returns {void}
	 * */
	registerCommand(client, command) {
		if (
			client.commands.some(
				(cmd) =>
					cmd.name === command.name || cmd.aliases?.includes(command.name)
			)
		) {
			return client.emit(
				'error',
				`A command with the name/alias "${command.name}" is already registered.`
			);
		}
		if (command.aliases) {
			for (const alias of command.aliases) {
				if (
					client.commands.some(
						(cmd) => cmd.name === alias || cmd.aliases?.includes(alias)
					)
				) {
					return client.emit(
						'error',
						`A command with the name/alias "${alias}" is already registered.`
					);
				}
			}
		}

		client.commands.set(command.name, command);
		client.emit('debug', `Registered command: ${command.name}.`);
	}

	/**
	 * Registers all commands in a directory
	 * @param {object} client - Instance of the bot
	 * @param {string} dir - Directory where the commands are located
	 * @returns {void}
	 * */
	registerCommands(client, dir) {
		const obj = requireAll(dir);
		const commands = [];
		for (const command of Object.values(obj)) {
			commands.push(command);
		}
		for (const command of commands) {
			// TODO: Add better validity checks
			if (!command) {
				client.emit(
					'warn',
					`Attempting to register an invalid command object: ${command}; skipping.`
				);
				continue;
			}
			this.registerCommand(client, command);
		}
	}

	/**
	 * Registers a single event
	 * @param {object} client - Instance of the bot
	 * @param {object} command - The event to register
	 * @returns {void}
	 * */
	registerEvent(client, event) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}
		client.emit('debug', `Registered event: ${event.name}.`);
	}

	/**
	 * Registers all events in a directory
	 * @param {object} client - Instance of the bot
	 * @param {string} dir - Directory where the events are located
	 * @returns {void}
	 * */
	registerEvents(client, dir) {
		const obj = requireAll(dir);
		const events = [];
		for (const event of Object.values(obj)) {
			events.push(event);
		}
		for (const event of events) {
			// TODO: Add better validity checks
			if (!event) {
				client.emit(
					'warn',
					`Attempting to register an invalid event object: ${event}; skipping.`
				);
				continue;
			}
			this.registerEvent(client, event);
		}
	}
}

module.exports = registry;
