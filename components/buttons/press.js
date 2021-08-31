export const id = 'press';

export const execute = async (client, interaction) => {
	// update the message
	await interaction.update('Pong!');
};
