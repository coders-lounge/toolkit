import mongo from '../utils/mongo.js';
import settingsSchema from '../schemas/settings-schema.js';

export const name = 'guildDelete';
export const execute = async (client, guild) => {
	// guild settings manager
	await mongo().then(async () => {
		// delete the document to the corresponding guild if the bot when the bot has left it
		console.log(`Left Guild >> Left ${guild.name}`);
		await settingsSchema.findOneAndDelete({ "serverID": guild.id });
	});
};