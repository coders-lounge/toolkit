import { Client, Interaction } from 'discord.js';

export const name = 'interactionCreate';

/**
 * @param {Client} client - The instantiated client object
 * @param {Interaction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
	// CHAT_INPUT commands
	if (interaction.isCommand()) {
		// if not in collection return
		if (!client.commands.has(interaction.commandName)) return;

		try {
			// execute command logic
			await client.commands.get(interaction.commandName).execute(client, interaction);
		} catch (error) {
			// respond with error messsage
			console.log(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}

	// USER, & MESSAGE commands
	if (interaction.isContextMenu()) {
		// if not in collection return
		if (!client.contexts.has(interaction.commandName)) return;

		try {
			// execute command logic
			await client.contexts.get(interaction.commandName).execute(client, interaction);
		} catch (error) {
			// respond with error message
			console.log(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}

	// BUTTON interactions
	if (interaction.isButton()) {
		// if not in collection return
		if (!client.buttons.has(interaction.customId)) return;

		try {
			// execute button logic
			await client.buttons.get(interaction.customId).execute(client, interaction);
		} catch (error) {
			// respond with error message
			console.log(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}

	// MENU interactions
	if (interaction.isSelectMenu()) {
		// if not in collection return
		if (!client.menus.has(interaction.customId)) return;

		try {
			// execute menu logic
			await client.menus.get(interaction.customId).execute(client, interaction);
		} catch (error) {
			// respond with error message
			console.log(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
};
