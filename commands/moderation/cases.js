import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import { Case } from '../../utils/schemas.js';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'cases',
	description: "Get a user's cases",
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to get the cases of',
			required: true,
		},
		{
			name: 'page',
			type: 'INTEGER',
			description: 'The page to get',
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
	const page = interaction.options.getInteger('page') || 1;
	const page_size = 5;

	if (page < 1) return await interaction.reply('Invalid page number.');

	const cases =
		(await Case.findAll({
			where: {
				member: member.id,
			},
		})) || [];

	if (cases.length === 0) return await interaction.reply('No cases found.');

	const p_cases = cases.slice(page * page_size - page_size, page * page_size);

	if (p_cases.length === 0) return await interaction.reply('Invalid page number.');

	const embed = new MessageEmbed().setAuthor(
		`${member.user.tag}'s cases (page ${page}/${Math.ceil(cases.length / page_size)})`,
		member.user.displayAvatarURL({ dynamic: true })
	);

	p_cases.forEach((_case) => {
		embed.addField(
			`\`${_case.type}\` - <t:${_case.timestamp}>`,
			`[#${_case.id}](${_case.url}) ${_case.reason}`
		);
	});

	await interaction.reply({
		embeds: [embed],
	});
};
