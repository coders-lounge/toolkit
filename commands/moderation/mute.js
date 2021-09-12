import { Client, CommandInteraction } from 'discord.js';
import { parseDuration } from '../../utils/helpers.js';
import mute from '../../utils/functions/mute.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'mute',
	description: 'mute a user.',
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to mute',
			required: true,
		},
		{
			name: 'duration',
			type: 'STRING',
			description: 'The duration of the mute',
			required: true,
			choices: [
				{
					name: 'infinite',
					value: 'inf',
				},
				{
					name: '10m',
					value: '10m',
				},
				{
					name: '20m',
					value: '20m',
				},
				{
					name: '30m',
					value: '30m',
				},
				{
					name: '1h',
					value: '1h',
				},
				{
					name: '12h',
					value: '12h',
				},
			],
		},
		{
			name: 'reason',
			type: 'STRING',
			description: 'The reason for the mute',
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
		id: '858658457359351808',
		type: 'ROLE',
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
	const duration = interaction.options.getString('duration');

	// if (member.id === interaction.member.id) {
	// 	return await interaction.reply("You can't mute yourself!");
	// }

	// if (member.id === client.user.id) {
	// 	return await interaction.reply("You can't mute me!");
	// }

	const result = await mute(
		client,
		member.id,
		interaction.member.id,
		reason,
		parseDuration(duration)
	);
	if (typeof result === 'number') {
		return await interaction.reply(
			`**${member.user.tag}** has been muted for ${duration} | ${reason}`
		);
	}
	result
		? await interaction.reply(`**${member.user.tag}** has been muted | ${reason}`)
		: await interaction.reply(`Unable to mute **${member.user.tag}**`);
};
