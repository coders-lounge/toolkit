import { Client } from 'discord.js';

export const name = 'messageCreate';

/**
 * @param {Client} client - The instantiated client object
 * @param {string} info - The message object
 * @returns {void}
 */
export const execute = (client, info) => {
	//ignore if the authour is the bot
	if (info.author.bot) return;
	//reply to the message
	if (info.channel == 'CHANNEL NAME HERE') {
		//add reactons to the mesage
		info.react('👍');
		info.react('👎');
		//create a thread
		info.channel.threads.create({
			name: 'discussion',
		});
	}
};
