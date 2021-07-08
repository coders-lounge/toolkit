const Discord = require('discord.js')
const mongo = require('../mongo')

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {
        console.log(`${client.user.tag} >> Logged in!`);
        //Log into the database
        await mongo().then(mongoose => { try { console.log('Database >> Connected to mongoose. Database fully operational!') } finally { mongoose.connection.close() } })
        //Set presence
        client.user.setPresence({ activity: { name: 'new releases', type: 'WATCHING' }, status: 'online' });
    },
};