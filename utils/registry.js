import * as fs from 'fs/promises';
const debug = process.argv.includes('--debug');

const commands = async (client, dir) => {
	const files = await fs.readdir(dir).catch(() => []);

	if (!files) return;

	for await (const file of files) {
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			commands(client, `./${dir}/${file}`);
			continue;
		}

		const command = await import(`../${dir}/${file}`);
		if (!command.data) {
			if (debug) console.log(`${dir}/${file} > no data`);
			continue;
		};
		client.commands.set(command.data.name, command);
		if (debug) console.log(`command ${command.data.name} > registered`);
	}
};

const buttons = async (client, dir) => {
	const files = await fs.readdir(dir).catch(() => []);

	if (!files) return;

	for await (const file of files) {
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			buttons(client, `./${dir}/${file}`);
			continue;
		}

		const button = await import(`../${dir}/${file}`);
		if (!button.data) {
			if (debug) console.log(`${dir}/${file} > no data`);
			continue;
		};
		client.buttons.set(button.data.id, button);
		if (debug) console.log(`button ${button.data.name} > registered`);
	}
};

const menus = async (client, dir) => {
	const files = await fs.readdir(dir).catch(() => []);

	if (!files) return;

	for await (const file of files) {
		if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
			menus(client, `./${dir}/${file}`);
			continue;
		}

		const menu = await import(`../${dir}/${file}`);
		if (!menu.data) {
			if (debug) console.log(`${dir}/${file} > no data`);
			continue;
		};
		client.menus.set(menu.data.id, menu);
		if (debug) console.log(`menu ${menu.data.name} > registered`);
	}
};

const events = async (client, dir) => {
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
};

export { commands, buttons, menus, events };
