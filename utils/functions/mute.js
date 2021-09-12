import { Client } from 'discord.js';
import 'dotenv/config';
import { Case, Mute } from '../schemas.js';
import { createMute } from '../mutes.js';

/**
 *
 * @param {Client} client - The instantiated client object
 * @param {String} user - ID of the user to mute
 * @param {String} moderator - ID of the moderator who muted the user
 * @param {String} reason - Reason for muting the user
 * @param {String} duration - Duration of the mute
 * @returns {Promise<Boolean>} - Returns a promise that resolves to the result of the mute
 */
export default async function mute(client, user, moderator, reason, duration) {
	const guild = client.guilds.cache.get(process.env.GUILD_ID);
	const member = guild.members.cache.get(user);
	const muteRole = guild.roles.cache.find((r) => r.name === 'Muted');
	const muted = member.roles.cache.has(muteRole.id);

	if (!member || !muteRole || muted) return false;

	await member.roles.add(muteRole);

	const _case = await Case.create({
		type: 'mute',
		member: member.id,
		moderator: moderator,
		reason: reason,
		timestamp: Math.floor(Date.now() / 1000),
	});

	if (duration !== 'inf') {
		await Mute.create({
			case_id: _case.id,
			reason: 'Automatic',
			timestamp: Date.now() + duration,
		});
		createMute(client, member.id, moderator, 'Automatic', duration, _case.id);
	}

	return true;
}
