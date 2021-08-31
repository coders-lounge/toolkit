import { Client, CommandInteraction } from 'discord.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'ping',
	description: 'Replies with Pong!',
};

/**
 * @param {Client} client - The instantiated client object
 * @param {CommandInteraction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
	await interaction.reply(`Pong! \`${client.ws.ping}\`ms`);
};
