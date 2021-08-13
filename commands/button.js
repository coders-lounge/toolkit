import { MessageActionRow, MessageButton } from 'discord.js';

export const data = {
	name: 'button',
	description: 'Creates a button',
};

export const execute = async (client, interaction) => {
	const button = new MessageButton()
		.setCustomId('press')
		.setLabel('Press Me!')
		.setStyle('PRIMARY');

	const row = new MessageActionRow().addComponents(button);

	await interaction.reply({ content: 'ping...', components: [row] });
};
