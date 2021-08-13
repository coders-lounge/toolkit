export const data = {
	name: 'ping',
	description: 'Replies with Pong!',
};

export const execute = async (client, interaction) => {
	await interaction.reply(`Pong! \`${client.ws.ping}\`ms`);
};