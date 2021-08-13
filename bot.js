import { Client, Intents, Collection } from 'discord.js';
import 'dotenv/config';

import { commands, buttons, events, menus } from './utils/registry.js';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();

await commands(client, './commands');
await buttons(client, './components/buttons');
await menus(client, './components/menus');
await events(client, './events');

client.login(process.env.BOT_TOKEN);
