import {
	Client,
	ButtonInteraction,
	MessageButton,
	MessageSelectMenu,
	MessageActionRow,
} from 'discord.js';

export const id = 'notifications';

/**
 * @param {Client} client - The instantiated client object
 * @param {ButtonInteraction} interaction - The Interaction object
 * @returns {void}
 */
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
		.setMaxValues(3)
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
			{
				label: 'Courses',
				value: 'learn',
				default: interaction.member.roles.cache.has('894300648798048276'),
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
	if (interaction.channel.id === '765938840190844973') {
		await interaction.reply({
			content: 'Notification Roles:',
			components: [menu],
			ephemeral: true,
		});
	} else {
		await interaction.update({ components: [buttons, menu] });
	}
};
