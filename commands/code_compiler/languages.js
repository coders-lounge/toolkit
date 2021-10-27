import {
	Client,
	ButtonInteraction,
	MessageSelectMenu,
	MessageActionRow,
} from 'discord.js';
import fs from 'fs';

/**
 * @type {import('discord.js').ApplicationCommandData}
 */
 export const data = {
	name: 'languages',
	description: 'View languages that are available to be compiled',
	options: [],
	defaultPermission: true,
};

/**
 * @param {Client} client - The instantiated client object
 * @param {ButtonInteraction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
	const languages = await JSON.parse(fs.readFileSync("./languageVersions.json"));
	const selectMenuOptions = Object.values(languages).map((language, index) => {
		return {
			label: language.name,
			value: Object.keys(languages)[index]
		}
	})
	const langs = new MessageSelectMenu()
		.setCustomId('compiler_languages')
		.setMinValues(1)
		.setMaxValues(1)
		.addOptions(selectMenuOptions)
		.setPlaceholder('Select language:');

	const menu = new MessageActionRow().addComponents([langs]);

	// update the message
	await interaction.reply({ content: 'View language information below: ', components: [menu] });
};
