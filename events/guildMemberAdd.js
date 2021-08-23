export const name = 'guildMemberAdd';

export const execute = (client, member) => {
	const guild = member.guild;
	const channel = guild.channels.cache.get('765938840190844974');

	if (!channel) return;

	channel.send(
		`Welcome to **Coder's Lounge** ${member}! Make sure to introduce yourself, and we look forward to hearing about your projects in <#765938840190844977>`
	);
};
