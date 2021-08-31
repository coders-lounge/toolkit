export const name = 'guildMemberAdd';

const roles = ['765938839734190113', '765938839734190112'];

export const execute = (client, member) => {
	const channel = member.guild.channels.cache.get('765938840190844974');

	roles.forEach((id) => {
		const role = member.guild.roles.cache.get(id);
		member.roles.add(role);
	});

	if (!channel) return;

	channel.send(
		`Welcome to **Coder's Lounge** ${member}! Make sure to introduce yourself, and we look forward to hearing about your projects in <#765938840190844977>`
	);
};
