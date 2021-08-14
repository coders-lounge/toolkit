export const data = {
	id: 'press',
};

export const execute = async (client, interaction) => {
    // update the message
	await interaction.update('Pong!');
};
