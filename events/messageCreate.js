import { Client } from 'discord.js';

export const name = 'messageCreate';

/**
 * @param {Client} client - The instantiated client object
 * @param {string} message - The message object
 * @returns {void}
 */
export const execute = (client, message) => {
	//ignore if the author is the bot
	if (message.author.bot) return;
	//reply to the message
	if (message.channel == '822140163467509781') {
		//add reactons to the mesage
		message.react('👍');
		message.react('👎');
		//create a thread
		message.startThread({
			name: `${message.author.username}\'s suggestion`,
		});
	}
};
