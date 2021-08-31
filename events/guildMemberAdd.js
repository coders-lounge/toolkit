export const name = 'guildMemberAdd';

const roles = ['765938839734190113', '765938839734190112'];

export const execute = (client, member) => {
	const guild = member.guild;
	const channel = guild.channels.cache.get('765938840190844974');

	roles.forEach((id) => {
		const role = newMember.guild.roles.cache.get(id);
		newMember.roles.add(role);
	});

	if (!channel) return;

	channel.send(
		`Welcome to **Coder's Lounge** ${member}! Make sure to introduce yourself, and we look forward to hearing about your projects in <#765938840190844977>`
	);
};
