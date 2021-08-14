import { MessageActionRow, MessageButton } from 'discord.js';

export const data = {
	name: 'button',
	description: 'Creates a button',
};

export const execute = async (client, interaction) => {
    // create a button
	const button = new MessageButton()
		.setCustomId('press')
		.setLabel('Press Me!')
		.setStyle('PRIMARY');

    // add button to an action row
	const row = new MessageActionRow().addComponents(button);

    // respond with message and action row
	await interaction.reply({ content: 'ping...', components: [row] });
};
