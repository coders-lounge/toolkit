export const data = {
	id: 'pronoun_roles',
};

const roles = {
	he_him: '882285832915005480',
	she_her: '882285944965857290',
	they_them: '882286055494139944',
	other: '882286100071186432',
};

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
		content: 'Your pronouns have been updated.',
		ephemeral: true,
	});
};
