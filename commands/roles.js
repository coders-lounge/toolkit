import {
	Client,
	CommandInteraction,
	MessageButton,
	MessageSelectMenu,
	MessageActionRow,
} from 'discord.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'roles',
	description: 'Open the chooseable roles menu',
};

/**
 * @param {Client} client - The instantiated client object
 * @param {CommandInteraction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
	const pronouns = new MessageButton()
		.setLabel('Pronouns')
		.setStyle('PRIMARY')
		.setCustomId('pronouns');

	const notifications = new MessageButton()
		.setLabel('Notifications')
		.setStyle('PRIMARY')
		.setCustomId('notifications');

	const languages = new MessageButton()
		.setLabel('Languages')
		.setStyle('PRIMARY')
		.setCustomId('languages');

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

	if (interaction.channel.id === '765938840190844973') {
		await interaction.channel.send({
			content: 'Select your roles below! You can also run `/roles`',
			components: [buttons],
		});
	} else {
		await interaction.reply({
			content: 'Select your roles below!',
			components: [buttons, menu],
			ephemeral: true,
		});
	}
};
