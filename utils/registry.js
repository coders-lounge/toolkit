import * as fs from 'fs/promises';
// check '--debug' flag
const debug = process.argv.includes('--debug');

const commands = async (client, dir) => {
	// get all files in {dir}
	const files = await fs.readdir(dir).catch(() => []);

	// return if there are no files
	if (!files) return;

	// loop through command files
	for await (const file of files) {
		// if file is folder run function recursively
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			commands(client, `./${dir}/${file}`);
			continue;
		}

		// import command from file
		const command = await import(`../${dir}/${file}`);
		// if no data skip registering command
		if (!command.data) {
			// debug message
			if (debug) console.log(`${dir}/${file} > no data`);
			continue;
		}
		command.data.type = 'CHAT_INPUT';
		// add command to collection
		client.commands.set(command.data.name, command);
		// debug message
		if (debug) console.log(`command ${command.data.name} > registered`);
	}
};

const contexts = async (client, dir) => {
	// get all files in {dir}
	const files = await fs.readdir(dir).catch(() => []);

	// return if there are no files
	if (!files) return;

	// loop through context menu files
	for await (const file of files) {
		// if file is folder run function recursively
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			contexts(client, `./${dir}/${file}`);
			continue;
		}

		// import context menu from file
		const command = await import(`../${dir}/${file}`);
		// if no data skip registering context menu
		if (!command.data) {
			// debug message
			if (debug) console.log(`${dir}/${file} > no data`);
			continue;
		}
		// add context menu to collection
		client.contexts.set(command.data.name, command);
		// debug message
		if (debug) console.log(`context menu ${command.data.name} > registered`);
	}
};

const buttons = async (client, dir) => {
	// get all files in {dir}
	const files = await fs.readdir(dir).catch(() => []);

	// return if there are no files
	if (!files) return;

	// loop through button files
	for await (const file of files) {
		// if file is folder run fuction recursively
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			buttons(client, `./${dir}/${file}`);
			continue;
		}

		// import button from file
		const button = await import(`../${dir}/${file}`);
		// if no data skip registering button
		if (!button.data) {
			// debug message
			if (debug) console.log(`${dir}/${file} > no data`);
			continue;
		}
		// add button to collection
		client.buttons.set(button.data.id, button);
		// debug message
		if (debug) console.log(`button ${button.data.name} > registered`);
	}
};

const menus = async (client, dir) => {
	// get all files in {dir}
	const files = await fs.readdir(dir).catch(() => []);

	// return if there are no files
	if (!files) return;

	// loop through menu files
	for await (const file of files) {
		// if file is folder run fuction recursively
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			menus(client, `./${dir}/${file}`);
			continue;
		}

		// import menu from file
		const menu = await import(`../${dir}/${file}`);
		// if no data skip registering menu
		if (!menu.data) {
			// debug message
			if (debug) console.log(`${dir}/${file} > no data`);
			continue;
		}
		// add menu to collection
		client.menus.set(menu.data.id, menu);
		// debug message
		if (debug) console.log(`menu ${menu.data.name} > registered`);
	}
};

const events = async (client, dir) => {
	// get all files in {dir}
	const files = await fs.readdir(dir).catch(() => []);

	// return if there are no files
	if (!files) return;

	// loop through event files
	for await (const file of files) {
		// if file is folder run fuction recursively
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			events(client, `./${dir}/${file}`);
			continue;
		}

		// import event from file
		const event = await import(`../${dir}/${file}`);

		// bind event to listener
		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}
		// debug message
		if (debug) console.log(`event ${event.name} > registered`);
	}
};

// export all functions
export { commands, contexts, buttons, menus, events };
