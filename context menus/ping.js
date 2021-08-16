export const data = {
	name: 'ping',
	type: 'MESSAGE',
};

export const execute = (client, interaction) => {
	interaction.reply('Pong!');
};
