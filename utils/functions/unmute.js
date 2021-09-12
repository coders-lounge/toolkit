import { Client } from 'discord.js';
import 'dotenv/config';
import { createMute } from '../mutes.js';
import { Case } from '../schemas.js';

/**
 *
 * @param {Client} client - The instantiated client object
 * @param {String} user - ID of the user to unmute
 * @param {String} moderator - ID of the moderator who unmuted the user
 * @param {String} reason - Reason for unmuting the user
 * @returns {Promise<Boolean>} - Returns a promise that resolves to the result of the unmute
 */
export default async function unmute(client, user, moderator, reason, delay) {
	if (delay) {
		createMute(client, user, moderator, reason, delay);
		return delay;
	}

	const guild =
		client.guilds.cache.get(process.env.GUILD_ID) ??
		(await client.guilds.fetch(process.env.GUILD_ID));

	const member = guild.members.cache.get(user) ?? (await guild.members.fetch(user));
	const muteRole = guild.roles.cache.find((r) => r.name === 'Muted');
	const muted = member.roles.cache.has(muteRole.id);

	if (!member || !muteRole || !muted) return false;

	await member.roles.remove(muteRole);

	await Case.create({
		type: 'unmute',
		member: member.id,
		moderator: moderator,
		reason: reason || 'No reason provided',
		timestamp: Math.floor(Date.now() / 1000),
	});

	return true;
}
