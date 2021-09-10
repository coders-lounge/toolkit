import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import { Case } from '../../utils/schemas.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'case',
	description: 'Manage a moderation case',
	options: [
		{
			name: 'get',
			description: 'Get a case',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'id',
					description: 'ID of the case',
					type: 'INTEGER',
					required: true,
				},
			],
		},
		{
			name: 'edit',
			description: 'Edit a case',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'id',
					description: 'ID of the case',
					type: 'INTEGER',
					required: true,
				},
				{
					name: 'reason',
					description: 'New reason for the case',
					type: 'STRING',
					required: true,
				},
			],
		},
		{
			name: 'delete',
			description: 'Delete a case',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'id',
					description: 'ID of the case',
					type: 'INTEGER',
					required: true,
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
	const choice = interaction.options.getSubcommand();
	const id = interaction.options.getInteger('id');
	const reason = interaction.options.getString('reason');

	const _case = await Case.findOne({
		where: {
			id: id,
		},
	});

	if (!_case) return await interaction.reply(`Case with ID ${id} not found.`);

	switch (choice) {
		case 'get':
			let embed = new MessageEmbed()
				.setTitle(`\`${_case.type}\` - Case #${id}`)
				.setDescription(`[Go to original case](${_case.url})`)
				.addFields(
					{ name: 'User', value: `<@${_case.member}>`, inline: true },
					{ name: 'Moderator', value: `<@${_case.moderator}>`, inline: true },
					{ name: 'Reason', value: _case.reason }
				)
				.setTimestamp(_case.timestamp);
			return await interaction.reply({ embeds: [embed] });
		case 'edit':
			// TODO: update case log message
			await _case.update({ reason: reason });
			return await interaction.reply('Updated case: ' + id);
		case 'delete':
			await _case.destroy();
			return await interaction.reply('Deleted case: ' + id);
	}
};
