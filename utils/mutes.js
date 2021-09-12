import { Client, Collection } from 'discord.js';
import unmute from './functions/unmute.js';
import { Case, Mute } from './schemas.js';

/**
 * @param {Client} client - The instantiated client object
 * @param {string} member - ID of the user to set unmute delay for
 */
export function createMute(client, member, moderator, reason, duration, id) {
	setTimeout(() => {
		unmute(client, member, moderator, reason);

		if (id) {
			Mute.destroy({ where: { case_id: id } });
		}
	}, duration);
}

export async function loadMutes(client) {
	const mutes = await Mute.findAll();

	for (const mute of mutes) {
		const _case = await Case.findOne({ where: { id: mute.case_id } });

		if (mute.timestamp > Date.now()) {
			return unmute(client, _case.member, _case.moderator, _case.reason);
		}

		createMute(
			client,
			_case.member,
			_case.moderator,
			mute.reason ?? 'Automatic',
			mute.timestamp - Date.now(),
			mute.case_id
		);
	}
}
