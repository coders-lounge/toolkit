import { Client, CommandInteraction } from 'discord.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'unban',
	description: 'Unban a user.',
	options: [
		{
			name: 'user',
			type: 'STRING',
			description: 'The id of the user to unban',
			required: true,
		},
		{
			name: 'reason',
			type: 'STRING',
			description: 'The reason for the unban',
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
	const member = interaction.options.getString('user');
	const reason = interaction.options.getString('reason');

	const ban = interaction.guild.bans.fetch(member);

	if (!ban) return await interaction.reply("That user isn't banned!");

	const reply = await interaction.reply({
		content: `**${ban.user.tag}** has been unbanned ${reason ? `| ${reason}` : ``}`,
		fetchReply: true,
	});

	await Case.create({
		type: 'unban',
		member: member.id,
		moderator: interaction.member.id,
		reason: reason ?? 'No reason provided',
		url: reply.url,
		timestamp: Math.floor(Date.now() / 1000),
	});

	await interaction.guild.bans.remove(member);
};
