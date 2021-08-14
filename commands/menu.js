import { MessageActionRow, MessageSelectMenu } from 'discord.js';

export const data = {
	name: 'menu',
	description: 'Creates a menu',
};

export const execute = async (client, interaction) => {
    // create menu with two options
	const menu = new MessageSelectMenu()
		.setCustomId('select')
		.setPlaceholder('Nothing selected')
		.addOptions([
			{
				label: 'Select me',
				description: 'This is a description',
				value: 'first_option',
			},
			{
				label: 'You can select me too',
				description: 'This is also a description',
				value: 'second_option',
			},
		]);

    // add menu to an action row
	const row = new MessageActionRow().addComponents(menu);

    // respond with message and action row
	await interaction.reply({ content: 'ping...', components: [row] });
};
