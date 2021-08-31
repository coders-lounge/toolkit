import { Client, SelectMenuInteraction } from 'discord.js';

export const id = 'language_roles';

const roles = {
	js: '766049207495819315',
	py: '766052392529428532',
	cs: '766049382415728671',
	cpp: '766049356058591232',
	rs: '766049265758896161',
	java: '766051595418468362',
	html: '766956445429923863',
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
		content: 'Your programming languages have been updated.',
		ephemeral: true,
	});
};
