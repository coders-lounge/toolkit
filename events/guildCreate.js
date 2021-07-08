const mongo = require('../mongo')
const settingsSchema = require('../schemas/settings-schema')

module.exports = {
    name: 'guildCreate',
    once: false,
    execute: async (client, guild) => {
        //Guild settings manager
        await mongo().then(async () => {

            //Setting values - Currently only storing guild ID so more data can be assigned later without the need of creating these schemas for every guild
            let serverID = guild.id
            
            console.log(`New Guild >> Joined ${guild.name}`)

            //Return if document already exsists - This is only a failsafe, the bot will delete the document of the server when it leaves it
            let settings = await settingsSchema.find({ "serverID": guild.id })
            if (settings.length) return;
            
            console.log(`New Guild >> Settings document for ${guild.name} was not found while joining, made a new one.`)
            
            //Create new document via the settingsSchema with the values, then save.
            await new settingsSchema({ serverID }).save()
        });
    }
};