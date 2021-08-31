import { Client, Intents, Collection } from 'discord.js';
import 'dotenv/config';

import { commands, components, events } from './utils/registry.js';

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

client.commands = await commands('./commands');
client.contexts = await commands('./context menus');
client.buttons = await components('./components/menus');
client.menus = await components('./components/buttons');

await events(client, './events');

client.login(process.env.BOT_TOKEN);
