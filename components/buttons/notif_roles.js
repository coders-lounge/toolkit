import { MessageSelectMenu, MessageActionRow } from 'discord.js';

export const data = {
	id: 'notif_roles',
};

export const execute = async (client, interaction) => {
	const roles = new MessageSelectMenu()
		.setCustomId('notification_roles')
		.setMinValues(0)
		.setMaxValues(2)
		.addOptions([
			{
				label: 'Announcements',
				value: 'announce',
				default: interaction.member.roles.cache.has('765938839734190112'),
			},
			{
				label: 'Chat Reviver',
				value: 'revive',
				default: interaction.member.roles.cache.has('765938839734190111'),
			},
		])
		.setPlaceholder('Choose roles');

	const menu = new MessageActionRow().addComponents([roles]);

	// update the message
	await interaction.reply({
		content: 'Notification Roles:',
		components: [menu],
		ephemeral: true,
	});
};
