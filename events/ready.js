import mongo from '../utils/mongo.js';

export const name = 'ready';
export const once = true;

export const execute = async (client) => {
    console.log(`${client.user.tag} >> Logged in!`);
    client.user.setPresence({ activity: { name: 'new releases', type: 'WATCHING' }, status: 'online' });

    // log into the database
    await mongo().then(mongoose => { try { console.log('Database >> Connected to mongoose. Database fully operational!') } finally { mongoose.connection.close() } });

    // get commands from collection and map to array
    const commands = client.commands.map((command) => command.data);

    // register commands
    await client.guilds.cache.get(process.env.GUILD_ID)?.commands.set(commands);

    // fetch registered commands
	const cmds = await client.guilds.cache
		.get(process.env.GUILD_ID)
		?.commands.fetch();

    // set permissions
	client.commands
		.filter((command) => command.permissions)
		.each(async (command) => {
			const cmd = await cmds
				.filter((cmd) => cmd.name === command.data.name)
				?.first();
			if (cmd) cmd.permissions?.set({ permissions: command.permissions });
		});
};