import { MessageButton, MessageSelectMenu, MessageActionRow } from 'discord.js';

export const data = {
	id: 'notifications',
};

export const execute = async (client, interaction) => {
	const pronouns = new MessageButton()
		.setCustomId('pronouns')
		.setLabel('Pronouns')
		.setStyle('PRIMARY');

	const notifications = new MessageButton()
		.setCustomId('notifications')
		.setLabel('Notifications')
		.setStyle('PRIMARY');

	const languages = new MessageButton()
		.setCustomId('languages')
		.setLabel('Languages')
		.setStyle('PRIMARY');

	const roles = new MessageSelectMenu()
		.setCustomId('notification_roles')
		.setMinValues(0)
		.setMaxValues(2)
		.addOptions([
			{
				label: 'Announcements',
				value: 'announce',
				default: interaction.member.roles.cache.has('765938839734190112'),
			},
			{
				label: 'Chat Reviver',
				value: 'revive',
				default: interaction.member.roles.cache.has('765938839734190111'),
			},
		])
		.setPlaceholder('Choose roles');

	const buttons = new MessageActionRow().addComponents([
		pronouns,
		notifications,
		languages,
	]);

	const menu = new MessageActionRow().addComponents([roles]);

	// update the message
	await interaction.update({ components: [buttons, menu] });
};
