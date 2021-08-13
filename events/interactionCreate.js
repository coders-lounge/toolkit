export const name = 'interactionCreate';
export const execute = async (client, interaction) => {
	if (interaction.isCommand()) {
		if (!client.commands.has(interaction.commandName)) return;

		try {
			await client.commands
				.get(interaction.commandName)
				.execute(client, interaction);
		} catch (error) {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}

	if (interaction.isButton()) {
		if (!client.buttons.has(interaction.customId)) return;

		try {
			await client.buttons
				.get(interaction.customId)
				.execute(client, interaction);
		} catch (error) {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}

	if (interaction.isSelectMenu()) {
		if (!client.menus.has(interaction.customId)) return;

		try {
			await client.menus
				.get(interaction.customId)
				.execute(client, interaction);
		} catch (error) {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
};
