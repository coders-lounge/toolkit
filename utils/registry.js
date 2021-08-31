import { Client, Collection } from 'discord.js';
import * as fs from 'fs/promises';

/**
 * @param {string} dir - The directory to load commands from.
 * @returns {Promise<Collection<string, any> | void>} - A collection of commands.
 */
async function commands(dir) {
	// get all files in {dir}
	const files = await fs.readdir(dir).catch(() => []);
	// create collection
	const cmds = new Collection();

	// return if there are no files
	if (!files) return;

	// loop through command files
	for await (const file of files) {
		// if file is folder run fuction recursively
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			commands(`./${dir}/${file}`);
			continue;
		}

		// import command from file
		const command = await import(`../${dir}/${file}`);
		// if no data skip registering command
		if (!command.data) continue;
		// add command to collection
		cmds.set(command.data.name, command);
	}

	// return collection
	return cmds;
}

/**
 * @param {string} dir - The directory to load components from.
 * @returns {Promise<Collection<string, any> | void>} - A collection of components.
 */
const components = async (dir) => {
	// get all files in {dir}
	const files = await fs.readdir(dir).catch(() => []);
	// create collection
	const comps = new Collection();

	// return if there are no files
	if (!files) return;

	// loop through button files
	for await (const file of files) {
		// if file is folder run fuction recursively
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			components(`./${dir}/${file}`);
			continue;
		}

		// import component from file
		const component = await import(`../${dir}/${file}`);
		// if no data skip registering component
		if (!component.id) continue;
		// add component to collection
		comps.set(component.id, component);
	}

	// return collection
	return comps;
};

/**
 * @param {Client} client - The client to bind events to.
 * @param {string} dir - The directory to load events from.
 * @returns {Promise<void>}
 */
async function events(client, dir) {
	const files = await fs.readdir(dir).catch(() => []);

	if (!files) return;

	for await (const file of files) {
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			events(client, `./${dir}/${file}`);
			continue;
		}

		const event = await import(`../${dir}/${file}`);

		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}
	}
}

// export all functions
export { commands, components, events };
