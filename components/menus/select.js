export const id = 'select';

export const execute = async (client, interaction) => {
	// get the option selected
	const option = interaction.values[0];

	// update the message
	await interaction.update('Pong!');
	// reply with the selected option
	await interaction.followUp(`${option} was Selected!`);
};
