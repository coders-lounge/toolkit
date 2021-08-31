import { Client } from 'discord.js';

export const name = 'debug';

/**
 * @param {Client} client - The instantiated client object
 * @param {string} info - The debug information
 * @returns {void}
 */
export const execute = (client, info) => {
	if (process.argv.includes('--debug')) console.log(info);
};
