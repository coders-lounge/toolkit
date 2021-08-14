import mongo from '../utils/mongo.js';

export const name = 'ready';
export const once = true;
export const execute = async (client) => {
    console.log(`${client.user.tag} >> Logged in!`);
    // log into the database
    await mongo().then(mongoose => { try { console.log('Database >> Connected to mongoose. Database fully operational!') } finally { mongoose.connection.close() } });
    // set presence
    client.user.setPresence({ activity: { name: 'new releases', type: 'WATCHING' }, status: 'online' });
};