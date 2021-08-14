import mongo from '../utils/mongo.js';
import settingsSchema from '../schemas/settings-schema.js';

export const name = 'guildCreate';
export const execute = async (client, guild) => {
    // guild settings manager
    await mongo().then(async () => {

        // setting values
        let serverID = guild.id;
            
        console.log(`New Guild >> Joined ${guild.name}`);

        // return if document already exsists - this is only a failsafe
        let settings = await settingsSchema.find({ "serverID": guild.id });
        if (settings.length) return;
            
        console.log(`New Guild >> Settings document for ${guild.name} was not found while joining, made a new one.`);
        
        // create new document via the settingsSchema with the values, then save.
        await new settingsSchema({ serverID }).save();
    });
};