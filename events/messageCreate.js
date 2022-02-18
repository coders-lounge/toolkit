import { Client } from 'discord.js';

export const name = 'messageCreate';

/**
 * @param {Client} client - The instantiated client object
 * @param {string} message - The message object
 * @returns {void}
 */
export const execute = (client, message) => {
	//ignore if the authour is the bot
	if (message.author.bot) return;
	//reply to the message
	if (message.channel == '896344115044835358') {
		//add reactons to the mesage
		message.react('👍');
		message.react('👎');
		//create a thread
		message.startThread({
			name: 'discussion',
		});
	}
};
