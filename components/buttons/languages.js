import {
	Client,
	ButtonInteraction,
	MessageButton,
	MessageSelectMenu,
	MessageActionRow,
} from 'discord.js';

export const id = 'languages';

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
		.setCustomId('language_roles')
		.setMinValues(0)
		.setMaxValues(7)
		.addOptions([
			{
				label: 'JavaScript',
				value: 'js',
				default: interaction.member.roles.cache.has('766049207495819315'),
			},
			{
				label: 'Python',
				value: 'py',
				default: interaction.member.roles.cache.has('766052392529428532'),
			},
			{
				label: 'C#',
				value: 'cs',
				default: interaction.member.roles.cache.has('766049382415728671'),
			},
			{
				label: 'C++',
				value: 'cpp',
				default: interaction.member.roles.cache.has('766049356058591232'),
			},
			{
				label: 'Rust',
				value: 'rs',
				default: interaction.member.roles.cache.has('766049265758896161'),
			},
			{
				label: 'Java',
				value: 'java',
				default: interaction.member.roles.cache.has('766051595418468362'),
			},
			{
				label: 'HTML/CSS',
				value: 'html',
				default: interaction.member.roles.cache.has('766956445429923863'),
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
			content: 'Language Roles:',
			components: [menu],
			ephemeral: true,
		});
	} else {
		await interaction.update({ components: [buttons, menu] });
	}
};
