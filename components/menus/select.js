export const data = {
	id: 'select',
};

export const execute = async (client, interaction) => {
	const option = interaction.values[0];

	await interaction.update('Pong!');
	await interaction.followUp(`${option} was Selected!`);
};
