import { Client, CommandInteraction } from 'discord.js';
import { Case } from '../../utils/schemas.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'warn',
	description: 'Warn a user.',
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to warn',
			required: true,
		},
		{
			name: 'reason',
			type: 'STRING',
			description: 'The reason for the warning',
			required: true,
		},
	],
	defaultPermission: false,
};

/**
 * @type {import('discord.js').ApplicationCommandPermissionData[]}
 */
export const permissions = [
	{
		id: '366652352125599744',
		type: 'USER',
		permission: true,
	},
	{
		id: '765938839742185493',
		type: 'ROLE',
		permission: true,
	},
	{
		id: '765938839742185494',
		type: 'ROLE',
		permission: true,
	},
];

/**
 * @param {Client} client - The instantiated client object
 * @param {CommandInteraction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
	const member = interaction.options.getMember('user');
	const reason = interaction.options.getString('reason');

	// if (member.id === interaction.member.id) {
	// 	return await interaction.reply("You can't warn yourself!");
	// }

	// if (member.id === client.user.id) {
	// 	return await interaction.reply("You can't warn me!");
	// }

	const reply = await interaction.reply({
		content: `**${member.user.tag}** has been warned | ${reason}`,
		fetchReply: true,
	});

	await Case.create({
		type: 'warn',
		member: member.id,
		moderator: interaction.member.id,
		reason: reason,
		url: reply.url,
		timestamp: Math.floor(Date.now() / 1000),
	});
};
