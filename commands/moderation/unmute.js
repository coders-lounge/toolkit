import { Client, CommandInteraction } from 'discord.js';
import { parseDuration } from '../../utils/helpers.js';
import unmute from '../../utils/functions/unmute.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'unmute',
	description: 'unmute a user.',
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to unmute',
			required: true,
		},
		{
			name: 'reason',
			type: 'STRING',
			description: 'The reason for the unmute',
			required: true,
		},
		{
			name: 'delay',
			type: 'STRING',
			description: 'The delay to unmute after',
			choices: [
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
	const delay = interaction.options.getString('delay');

	// if (member.id === interaction.member.id) {
	// 	return await interaction.reply("You can't mute yourself!");
	// }

	// if (member.id === client.user.id) {
	// 	return await interaction.reply("You can't mute me!");
	// }

	const result = await unmute(
		client,
		member.id,
		interaction.member.id,
		reason,
		parseDuration(delay)
	);

	if (typeof result === 'number')
		return await interaction.reply(
			`**${member.user.tag}** will be unmuted in ${delay} | ${reason}`
		);
	result
		? await interaction.reply(`**${member.user.tag}** has been unmuted | ${reason}`)
		: await interaction.reply(`Unable to unmute **${member.user.tag}**`);
};
