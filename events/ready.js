import mongo from '../utils/mongo.js';

export const name = 'ready';
export const once = true;

export const execute = async (client) => {
	console.log(`${client.user.tag} >> Logged in!`);
	client.user.setPresence({
		activity: { name: 'new releases', type: 'WATCHING' },
		status: 'online',
	});

	// log into the database
	await mongo().then((mongoose) => {
		try {
			console.log(
				'Database >> Connected to mongoose. Database fully operational!'
			);
		} finally {
			mongoose.connection.close();
		}
	});

	// set commands
	client.commands.each(async (command) => {
		const cmd = await client.application.commands.create(
			command.data,
			process.env.GUILD_ID || undefined
		);
		if (command.permissions)
			cmd.permissions?.set({ permissions: command.permissions });
	});

	// set context menus
	client.contexts.each(async (command) => {
		const cmd = await client.application.commands.create(
			command.data,
			process.env.GUILD_ID || undefined
		);
		if (command.permissions)
			cmd.permissions?.set({ permissions: command.permissions });
	});
};
