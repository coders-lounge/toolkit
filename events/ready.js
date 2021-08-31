import { Client } from 'discord.js';
import mongo from '../utils/mongo.js';

export const name = 'ready';
export const once = true;

/**
 * @param {Client} client - The instantiated client object
 * @returns {void}
 */
export const execute = async (client) => {
	console.log(`${client.user.tag} >> Logged in!`);
	client.user.setPresence({
		activity: { name: 'new releases', type: 'WATCHING' },
		status: 'online',
	});

	const cmds = await client.application.commands.fetch({
		guildId: process.env.GUILD_ID || undefined,
	});

	const commands = client.commands.concat(client.contexts);

	// delete/edit already registered commands
	cmds.each(async (command) => {
		const cmd = commands.get(command.name);
		if (!cmd)
			client.application.commands.delete(command, process.env.GUILD_ID || undefined);
		else {
			const c = await client.application.commands.create(
				cmd.data,
				process.env.GUILD_ID || undefined
			);
			if (cmd.permissions) c.permissions?.set({ permissions: cmd.permissions });
			commands.set(cmd.name, { ...cmd, registered: true });
		}
	});

	// register new commands
	commands
		.filter((c) => c.registered !== true)
		.each(async (command) => {
			const cmd = await client.application.commands.create(
				command.data,
				process.env.GUILD_ID || undefined
			);
			if (command.permissions) cmd.permissions?.set({ permissions: command.permissions });
		});

	console.log('Registered all commands');
};
