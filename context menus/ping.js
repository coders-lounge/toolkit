import { Client, CommandInteraction } from 'discord.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'ping',
	type: 'MESSAGE',
};

/**
 * @param {Client} client - The instantiated client object
 * @param {CommandInteraction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = (client, interaction) => {
	interaction.reply('Pong!');
};
