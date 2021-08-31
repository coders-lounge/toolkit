import {
	Client,
	ButtonInteraction,
	MessageButton,
	MessageSelectMenu,
	MessageActionRow,
} from 'discord.js';

export const id = 'pronouns';

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
		.setCustomId('pronoun_roles')
		.setMinValues(0)
		.setMaxValues(4)
		.addOptions([
			{
				label: 'He/Him',
				value: 'he_him',
				emoji: '♂',
				default: interaction.member.roles.cache.has('882285832915005480'),
			},
			{
				label: 'She/Her',
				value: 'she_her',
				emoji: '♀',
				default: interaction.member.roles.cache.has('882285944965857290'),
			},
			{
				label: 'They/Them',
				value: 'they_them',
				emoji: '⚧',
				default: interaction.member.roles.cache.has('882286055494139944'),
			},
			{
				label: 'Other',
				value: 'other',
				emoji: '❓',
				default: interaction.member.roles.cache.has('882286100071186432'),
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
