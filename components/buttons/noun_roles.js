import {
	Client,
	ButtonInteraction,
	MessageSelectMenu,
	MessageActionRow,
} from 'discord.js';

export const id = 'noun_roles';

/**
 * @param {Client} client - The instantiated client object
 * @param {ButtonInteraction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
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

	const menu = new MessageActionRow().addComponents([roles]);

	// update the message
	await interaction.reply({
		content: 'Pronoun Roles:',
		components: [menu],
		ephemeral: true,
	});
};
