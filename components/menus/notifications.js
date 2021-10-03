import { Client, SelectMenuInteraction } from 'discord.js';

export const id = 'notification_roles';

const roles = {
	announce: '765938839734190112',
	revive: '765938839734190111',
	learn: '894300648798048276',
};

/**
 * @param {Client} client The instantiated client object
 * @param {SelectMenuInteraction} interaction The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
	const options = interaction.values;

	for (const [role, id] of Object.entries(roles)) {
		if (interaction.member.roles.cache.has(id) && !options.includes(role)) {
			await interaction.member.roles.remove(id);
		} else if (options.includes(role)) {
			await interaction.member.roles.add(id);
		}
	}

	await interaction.reply({
		content: 'Your notification preferences have been updated.',
		ephemeral: true,
	});
};
